import React from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./testComponents.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import { simulateSurvey, SimulationOptions, SimulationResult } from "./SimulationEngine";

const defaultSeed = 12345;

const TestRunner: React.FC = () => {
  const { sections, surveyData, setSurveyData, setSections } = useAppStateMgtContext();
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  // If a survey object is passed via navigation state, prefer that. Otherwise
  // if the route param matches the current surveyData use the context data.
  const providedSurvey = (location.state as unknown as { survey?: import("../../../../../Utils/dataTypes").surveyTypeProps })?.survey;

  // derived references used for simulation — prefer providedSurvey when present
  const activeSurvey = providedSurvey ?? (id && surveyData?.id === id ? surveyData : surveyData);
  const activeSections = providedSurvey ? providedSurvey.sections : sections;

  // If a survey was provided via navigation state, make it the active context so
  // other components that rely on surveyData/sections can read it too.
  React.useEffect(() => {
    if (providedSurvey) {
      try {
        if (setSurveyData) setSurveyData(providedSurvey);
        if (setSections) setSections(providedSurvey.sections);
      } catch {
        // ignore failures — this is a best-effort sync
      }
    }
  }, [providedSurvey, setSurveyData, setSections]);
  const [mode, setMode] = React.useState<SimulationOptions["mode"]>("random");
  const [seed, setSeed] = React.useState<number>(defaultSeed);
  const [respectShuffle, setRespectShuffle] = React.useState<boolean>(true);
  const [autoRun, setAutoRun] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<SimulationResult | null>(null);
  const [running, setRunning] = React.useState(false);

  const runSimulation = React.useCallback(() => {
    setRunning(true);
    try {
      const opts: SimulationOptions = { mode, seed, respectShuffle, maxSteps: 500 };
      // pass the active/derived survey and sections into the simulator
      const res = simulateSurvey(activeSections, activeSurvey ?? null, opts);
      setResult(res);
    } finally {
      setRunning(false);
    }
  }, [mode, seed, respectShuffle, activeSections, activeSurvey]);

  React.useEffect(() => {
    if (autoRun) runSimulation();
  }, [autoRun, runSimulation]);

  return (
    <div className={styles.testRunner_root}>
      <div className={styles.toolbar}>
        <div>
          <label>Mode: </label>
          <select value={mode} onChange={(e) => setMode(e.target.value as SimulationOptions["mode"])}>
            <option value="random">Random</option>
            <option value="deterministic">Deterministic</option>
            <option value="preset">Preset</option>
          </select>
        </div>
        <div>
          <label>Seed: </label>
          <input type="number" value={seed} onChange={(e) => setSeed(Number(e.target.value))} />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={respectShuffle} onChange={(e) => setRespectShuffle(e.target.checked)} /> Respect Shuffle
          </label>
        </div>
        <div>
          <button onClick={runSimulation} disabled={running} className={styles.primaryBtn}>
            {running ? "Running..." : "Run Simulation"}
          </button>
          <button onClick={() => { setResult(null); }} className={styles.secondaryBtn}>
            Clear
          </button>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} /> Auto-run on change
          </label>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.leftPanel}>
          <h3>Run Log</h3>
          <div className={styles.logArea}>
            {result?.log?.length ? (
              result.log.map((l) => (
                <div key={l.step} className={styles.logEntry}>
                  <div className={styles.logHeader}>Step {l.step} — {l.questionId}</div>
                  <div className={styles.logBody}>{l.questionText}</div>
                  <div className={styles.logFooter}>Chosen: {JSON.stringify(l.chosen)} {l.actionTaken ? `• Action: ${l.actionTaken}` : null}</div>
                </div>
              ))
            ) : (
              <div className={styles.emptyPlaceholder}>No run yet. Click "Run Simulation".</div>
            )}
          </div>
        </div>

        <div className={styles.rightPanel}>
          <h3>Summary</h3>
          {result ? (
            <div>
              <div>Ended: {String(result.finalState.ended)}</div>
              <div>Current Question: {result.finalState.currentQuestionId}</div>
              <div>Quota Hits: {result.finalState.quotaHits.length}</div>
              <pre className={styles.jsonPreview}>{JSON.stringify(result.finalState, null, 2)}</pre>
              <a
                onClick={() => {
                  const blob = new Blob([JSON.stringify(result, null, 2)], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `simulation-${Date.now()}.json`;
                  a.click();
                }}
                className={styles.linkBtn}
              >
                Export Result
              </a>
            </div>
          ) : (
            <div className={styles.emptyPlaceholder}>No result</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
