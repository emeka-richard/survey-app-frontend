import React from "react";
import style from "../ScoringComponents/scoring.module.css";
import ScoringHeaderBTN from "../ScoringComponents/Scoring_HeaderBTN";
import useScoringLogicFxns from "../../../../../Utils/LogicHandlers/useScoringLogicFxns";

const ScoringHeader: React.FC = () => {
  const { saveChanges, resetAllPoints } = useScoringLogicFxns();
  const [scoringModeAuto, setScoringModeAuto] = React.useState(true);

  return (
    <div className={style.scoring_headerControls}>
      <label className={style.switchLabel}>
        <span>Quiz: </span>
        <input
          type="checkbox"
          checked={scoringModeAuto}
          onChange={() => setScoringModeAuto((s) => !s)}
        />
      </label>
      <span className={style.scoring_headerButtons}>
        <ScoringHeaderBTN
          handleClickFXN={saveChanges}
          title="Save Scoring Logic"
          label="Save"
        />
        <ScoringHeaderBTN
          title="Reset points to zero"
          label="Reset"
          handleClickFXN={resetAllPoints}
        />
      </span>
    </div>
  );
};

export default ScoringHeader;
