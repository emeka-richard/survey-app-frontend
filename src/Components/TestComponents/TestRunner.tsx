import React from "react";
import styles from "./testComponents.module.css";
import { useAppStateMgtContext } from "../../Utils/AppContext";
import { simulateSurvey, SimulationOptions, SimulationResult } from "./SimulationEngine";

const defaultSeed = 12345;

const TestRunner: React.FC = () => {
  const { sections, surveyData } = useAppStateMgtContext();
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
      const res = simulateSurvey(sections, surveyData ?? null, opts);
      setResult(res);
    } finally {
      setRunning(false);
    }
  }, [mode, seed, respectShuffle, sections, surveyData]);

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
