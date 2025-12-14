import React from "react";
import styles from "./testComponents.module.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import styles from "./testComponents.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import {
  sectionTypeProps,
  surveyTypeProps,
} from "../../../../../Utils/dataTypes";
import TestRunnerActionButton from "./TestRunner_ActionButton";
import TestRunnerStats from "./TestRunnerStats";

const TestRunner: React.FC = () => {
  const { sections, surveyData } = useAppStateMgtContext();
  // const { setCreateNavBTNLabel, setLogicNavBTNLabel } = useAppStateMgtContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  // console.log("Location state:", location.state);
  // console.log("ID:", id);
  // console.log("sections:", sections);
  // console.log("sections:", surveyData);
  const passedSurvey = (location.state as surveyTypeProps) ?? surveyData;

  // const passedSurveySectionArray = (location.state as surveyTypeProps)
  //   .sections as sectionTypeProps;

  const surveySectionArrayBeingTested: sectionTypeProps =
    passedSurvey.sections ??
    (id && surveyData?.id === id ? surveyData.sections : sections);

  console.log("Sections being tested:", surveySectionArrayBeingTested);
  console.log("Sections number:", surveySectionArrayBeingTested.length);
  console.log("passedSurvey =", passedSurvey);
  console.log("surveyData.title =", surveyData?.title);

  const handleRestartSimulation = () => {
    // Logic to restart the simulation
    console.log("Simulation restarted");
  };

  const handleExitSimulation = () => {
    // Logic to exit the simulation
    // switch the create survey layout to Logic and select Test Mode so the
    // TestModePanel is displayed when we navigate back
    // try {
    //   if (setCreateNavBTNLabel) setCreateNavBTNLabel("Logic");
    //   if (setLogicNavBTNLabel) setLogicNavBTNLabel("Test Mode");
    // } catch (e) {
    //   // ignore errors setting context
    //   // (defensive — nothing actionable if these setters are absent)
    //   void e;
    // }
    navigate("/surveys/create");
  };

  return (
    <main className={styles.testRunner_root}>
      <section className={styles.testRunner_surveyHeader}>
        <pre className={styles.testRunner_tabIDText}>Test Dashboard Strip</pre>
        <h3>{passedSurvey.title === "" && "Untitled Survey"}</h3>
        <pre className={styles.testRunner_description}>{passedSurvey.description ?? "No survey description"}</pre>
        <img className={styles.testRunnerThumbImage} />
        <div className={styles.testRunner_surveyHeader_buttons}>
          <div className={styles.testRunner_surveyHeader_stats}>
            <TestRunnerStats label={"Pages"} statFigure={0} /> |
            <TestRunnerStats
              label={"Sections"}
              statFigure={surveySectionArrayBeingTested.length}
            />{" "}
            |
            <TestRunnerStats label={"Questions"} statFigure={0} />
          </div>
          <div
            className={styles.testRunner_surveyHeader_actionButton_container}
          >
            <TestRunnerActionButton
              className={styles.testRunner_actionButton}
              buttonLabel={" Restart Simulation"}
              type={"reset"}
              onClick={handleRestartSimulation}
            />
            <TestRunnerActionButton
              className={styles.testRunner_actionButton}
              buttonLabel={" Exit Simulation"}
              type={"button"}
              onClick={handleExitSimulation}
            />
          </div>
        </div>
      </section>
      <section className={styles.testRunner_surveyDisplay}>
        <p>This is where the survey sections being tested will be displayed.</p>
      </section>
    </main>
  );
};

export default TestRunner;
