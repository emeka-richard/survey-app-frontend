import React from "react";
import styles from "./scoring.module.css";
import { ScoringSideBarProps } from "../../../../../Utils/dataTypes";

const ScoringSideBar: React.FC<ScoringSideBarProps> = ({
  applyAllValue,
  setApplyAllValue,
  applyPointsToAll,
  computeTotals,
}) => {
  return (
    <aside className={styles.scoring_sidebar}>
      <div className={styles.applyRow}>
        <label>Apply points to all:</label>
        <input
          type="number"
          min={0}
          className={styles.pointsInput}
          value={applyAllValue}
          onChange={(e) => {
            const raw = (e.target as HTMLInputElement).value;
            const parsed = raw === "" ? 0 : Number(raw);
            setApplyAllValue(
              Number.isNaN(parsed) ? 0 : Math.max(0, Math.floor(parsed))
            );
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log("Applying to all:", applyAllValue);
              applyPointsToAll(applyAllValue);
            }
          }}
          aria-label="Apply points to all questions (press Enter)"
        />
      </div>

      <div className={styles.previewBox}>
        <h3>Preview</h3>
        <ul className={styles.previewList}>
          {computeTotals.perSection.map((p) => (
            <li key={p.sectionId} className={styles.previewItem}>
              <span className={styles.previewTitle}>{p.title}</span>
              <span className={styles.previewValue}>{p.total} pts</span>
            </li>
          ))}
        </ul>
                  {/* <hr /> */}
        <div className={styles.previewTotal}>
          <strong>Total:</strong>
          <span>{computeTotals.grandTotal} pts</span>
        </div>
      </div>
    </aside>
  );
};

export default ScoringSideBar;
