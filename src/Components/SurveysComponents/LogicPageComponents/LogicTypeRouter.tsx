import React from "react";
import styles from "./logicType.module.css"; // Assuming you have a CSS module for styles
import { useAppStateMgtContext } from "../../../Utils/AppContext";
import SkipBranchLogic from "./LogicTypeDisplayComponents/SkipBranchComponents/Skip_Branch_logic";
import ScoringLogic from "./LogicTypeDisplayComponents/ScoringComponents/Scoring_logic";
import PipingLogic from "./LogicTypeDisplayComponents/PipingComponents/Piping_logic";
import DefaultPrefilLogic from "./LogicTypeDisplayComponents/DefaultPrefilComponents/DefaultPrefilPanel";
// import QuotasLogic from "./LogicTypeDisplayComponents/QuotasComponents/Quotas_logic";
import QuotasLogic2 from "./LogicTypeDisplayComponents/QuotasComponents/QuotasPanel2";
// import RandomisationLogic from "./LogicTypeDisplayComponents/Randomisation_logic";
// import ValidationLogic from "./LogicTypeDisplayComponents/Validation_logic";
// import TestModeLogic from "./LogicTypeDisplayComponents/Test_Mode_logic";
import TestRunner from "./LogicTypeDisplayComponents/TestComponents1/TestRunner";
// import LogicTypeHeader from "./LogicTypeDisplayComponents/LogicTypeHeaderComponents/LogicTypeHeader";

const LogicTypeRouter: React.FC = () => {
  const { logicNavBTNLabel } = useAppStateMgtContext();

  return (
    <div className={styles.logicTypeDisplay_wrapper}>
      {/* <LogicTypeHeader /> */}
      {/* Render the appropriate logic component based on the selected type */}
      {logicNavBTNLabel === "Skip/Branch" ? (
        <SkipBranchLogic />
      ) : logicNavBTNLabel === "Scoring" ? (
        <ScoringLogic />
      ) : logicNavBTNLabel === "Piping" ? (
        <PipingLogic />
      ) : logicNavBTNLabel === "Prefill" ? (
        <DefaultPrefilLogic />
      ) : logicNavBTNLabel === "Quotas" ? (
        <QuotasLogic2 />
        // <QuotasLogic />
      // ) : logicNavBTNLabel === "Randomisation" ? (
      //   <RandomisationLogic />
      // ) : logicNavBTNLabel === "Validation" ? (
      //   <ValidationLogic />
      ) : logicNavBTNLabel === "Test Mode" ? (
        <TestRunner />
      ) : null}
    </div>
  );
};

export default LogicTypeRouter;
