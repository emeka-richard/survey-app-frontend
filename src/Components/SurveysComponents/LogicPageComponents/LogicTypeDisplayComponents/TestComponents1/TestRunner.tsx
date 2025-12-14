import React from "react";
import styles from "./testComponents.module.css";
import { useParams, useLocation } from "react-router-dom";
// import styles from "./testComponents.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
import {
  sectionTypeProps,
  surveyTypeProps,
} from "../../../../../Utils/dataTypes";

const TestRunner: React.FC = () => {
  const { sections, surveyData } = useAppStateMgtContext();
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();

  // console.log("Location state:", location.state);
  // console.log("ID:", id);
  // console.log("sections:", sections);
  // console.log("sections:", surveyData);

  const passedSurveySectionArray = (location.state as surveyTypeProps)
    .sections as sectionTypeProps;

  const surveySectionArrayBeingTested: sectionTypeProps =
    passedSurveySectionArray ??
    (id && surveyData?.id === id ? surveyData.sections : sections);

    console.log("Sections being tested:", surveySectionArrayBeingTested);

  return (
  <main className={styles.testRunner_root}>
    <section className={styles.testRunner_surveyHeader}>
      <h2>Test Runner</h2>
      <div>
        <h3>Survey Sections Being Tested:</h3>
        <pre>
          This is where the survey sections being tested will be displayed.
          {/* {JSON.stringify(surveySectionArrayBeingTested, null, 2)} */}
        </pre>
      </div>
    </section>
    <section className={styles.testRunner_surveyDisplay}>
        <p>This is where the survey sections being tested will be displayed.</p>
    </section>
  </main>
);
};

export default TestRunner;
