import { sectionTypeProps, QuestionFrameProps, LogicCondition, Quota, surveyTypeProps, ResponseValue } from "../../Utils/dataTypes";

// Minimal PRNG for deterministic simulations (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type SimulationOptions = {
  mode: "random" | "deterministic" | "preset";
  seed?: number; // used for deterministic
  presetAnswers?: Record<string, ResponseValue>; // questionId -> value
  maxSteps?: number; // safety limit to avoid infinite loops
  respectShuffle?: boolean;
};

export type LogEntry = {
  step: number;
  questionId: string | null;
  questionText?: string;
  presentedOptions?: string[];
  chosen?: ResponseValue | null;
  actionTaken?: string | null;
  note?: string | null;
};

export type SimulationResult = {
  log: LogEntry[];
  finalState: {
    currentQuestionId: string | null;
    ended: boolean;
    quotaHits: { quotaId: string; name: string }[];
    scoringTotal?: number;
  };
};

// Helper: evaluate a single LogicCondition against a response value
function evaluateCondition(value: ResponseValue | undefined, condition: LogicCondition): boolean {
  const op = condition.operator;
    const condVal: unknown = condition.value;
  if (value === undefined || value === null) return false;

  // normalize to string for simple comparisons when appropriate
  if (typeof condVal === "string") {
    const sval = String(value);
    switch (op) {
      case "equal":
        return sval === condVal;
      case "not_equal":
        return sval !== condVal;
      case "includes":
          return Array.isArray(value) ? (value as unknown[]).map(String).includes(condVal) : sval.includes(condVal as string);
      case "greater_than":
        return Number(sval) > Number(condVal);
      case "less_than":
        return Number(sval) < Number(condVal);
      case "true_false":
        return Boolean(value) === (condVal === "true");
      default:
        return false;
    }
  }

  // If condition value is object (like a conditionStatementObjectArrayProps), try label/value
  return false;
}

// (removed unused helper findQuestionLocation)

// Build flat question list (ordered) from sections for easier navigation
function buildFlatQuestionList(sections: sectionTypeProps) {
  const list: { id: string; question: QuestionFrameProps; sectionIndex: number; questionIndex: number }[] = [];
  for (let si = 0; si < sections.length; si++) {
    const section = sections[si];
    for (let qi = 0; qi < section.questionFrames.length; qi++) {
      list.push({ id: section.questionFrames[qi].id, question: section.questionFrames[qi], sectionIndex: si, questionIndex: qi });
    }
  }
  return list;
}

// Main simulation function
export function simulateSurvey(sectionsInput: sectionTypeProps, surveyMeta: surveyTypeProps | null, options: SimulationOptions): SimulationResult {
  // Clone sections to avoid mutating app state
  const sections: sectionTypeProps = JSON.parse(JSON.stringify(sectionsInput));
  const flat = buildFlatQuestionList(sections);
  const idToIndex = new Map<string, number>();
  flat.forEach((f, idx) => idToIndex.set(f.id, idx));

  const rng = options.mode === "deterministic" && typeof options.seed === "number" ? mulberry32(options.seed) : Math.random;
  const maxSteps = options.maxSteps ?? 500;

  const quotas: Quota[] = (surveyMeta && surveyMeta.quotas) || [];
  const quotaCounters: Record<string, number> = {};
  quotas.forEach((q) => (quotaCounters[q.id] = q.count ?? 0));

  const log: LogEntry[] = [];
  let step = 0;
  let currentIndex = flat.length > 0 ? 0 : -1;
  let ended = false;
  const quotaHits: { quotaId: string; name: string }[] = [];
  const scoringTotal = 0;

  // Helper: pick an answer for a question
  function pickAnswer(q: QuestionFrameProps): ResponseValue | null {
    if (options.mode === "preset" && options.presetAnswers && options.presetAnswers[q.id] !== undefined) {
      return options.presetAnswers[q.id];
    }

    // options-based question: choose one of questionTypeOptions or a text/number
    if (q.questionTypeOptions && q.questionTypeOptions.length > 0) {
      const opts = [...q.questionTypeOptions];
      if (options.respectShuffle && q.shuffleChoices) {
        // simple shuffle
        for (let i = opts.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [opts[i], opts[j]] = [opts[j], opts[i]];
        }
      }
      if (options.mode === "random") return opts[Math.floor(rng() * opts.length)];
      if (options.mode === "deterministic") return opts[Math.floor(rng() * opts.length)];
    }

    // default textual answer
    if (q.questionTypeValue === "short-answer" || q.questionTypeValue === "long-answer") {
      return `sim-${q.id.substring(0, 6)}`;
    }

    // numeric or rating
    if (q.questionTypeValue === "rating") return 4;
    if (q.questionTypeValue === "date") return new Date().toISOString();

    return null;
  }

  // Main loop
  while (!ended && step < maxSteps && currentIndex >= 0 && currentIndex < flat.length) {
    step++;
    const current = flat[currentIndex];
    const q = current.question;
    const chosen = pickAnswer(q);

    // Evaluate logic on this question if any
    let actionTaken: string | null = null;
    if (q.logic && Array.isArray(q.logic) && q.logic.length > 0) {
      for (const cond of q.logic) {
        try {
          if (evaluateCondition(chosen ?? undefined, cond)) {
            // examine first action
            const act = cond.logicAction?.[0];
            if (act) {
              actionTaken = act.actionType;
              if (act.actionType === "skip_to") {
                // find target question id index
                const targetId = act.targetQuestionId;
                if (idToIndex.has(targetId)) {
                  currentIndex = idToIndex.get(targetId)!;
                } else {
                  log.push({ step, questionId: q.id, questionText: q.questionText, presentedOptions: q.questionTypeOptions, chosen, actionTaken: "invalid_skip_to", note: `Target ${act.targetQuestionId} not found` });
                  ended = true;
                }
                break; // stop evaluating further rules for this question
              }
              if (act.actionType === "end_survey") {
                ended = true;
                break;
              }
              // show/hide don't change flow in simulation; note them
            }
          }
        } catch {
          // ignore and continue
        }
      }
    }

    // Quotas: if this question has advancedConfigData.attributeName and the chosen matches quota values
    if (q.advancedConfigData && q.advancedConfigData.attributeName) {
      const attrName = q.advancedConfigData.attributeName;
      for (const quota of quotas) {
        if (quota.attribute === attrName) {
          // check if chosen matches any of the quota values
          const chosenStr = Array.isArray(chosen) ? (chosen as unknown[]).map(String).join(",") : String(chosen);
          if (quota.values.includes(chosenStr)) {
            quotaCounters[quota.id] = (quotaCounters[quota.id] || 0) + 1;
            if (quotaCounters[quota.id] > quota.limit) {
              quotaHits.push({ quotaId: quota.id, name: quota.name });
              // apply quota action
              if (quota.action === "terminate") {
                ended = true;
                actionTaken = `quota_terminate:${quota.id}`;
              }
            }
          }
        }
      }
    }

    log.push({ step, questionId: q.id, questionText: q.questionText, presentedOptions: q.questionTypeOptions, chosen, actionTaken: actionTaken ?? null, note: null });

    // if action moved currentIndex (skip_to), we already set it; else move next
    if (!actionTaken || (actionTaken && actionTaken !== "skip_to")) {
      currentIndex += 1;
    }

    if (currentIndex >= flat.length) {
      ended = true;
    }
  }

  return {
    log,
    finalState: {
      currentQuestionId: (flat[currentIndex] && flat[currentIndex].id) || null,
      ended,
      quotaHits,
      scoringTotal,
    },
  };
}
