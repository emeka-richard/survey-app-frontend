import React from "react";
import styles from "./testComponents.module.css";
import { SimulationResult } from "./SimulationEngine";

const TestSidebar: React.FC<{ result: SimulationResult | null }> = ({ result }) => {
  if (!result) return <div className={styles.sidebar_empty}>Run a simulation to inspect details.</div>;

  return (
    <div className={styles.sidebar_root}>
      <h4>Inspector</h4>
      <div>
        <strong>Ended:</strong> {String(result.finalState.ended)}
      </div>
      <div>
        <strong>Current Question:</strong> {result.finalState.currentQuestionId}
      </div>
      <div>
        <strong>Quota hits:</strong>
        <ul>
          {result.finalState.quotaHits.map((q) => (
            <li key={q.quotaId}>{q.name} ({q.quotaId})</li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Log size:</strong> {result.log.length}
      </div>
    </div>
  );
};

export default TestSidebar;
