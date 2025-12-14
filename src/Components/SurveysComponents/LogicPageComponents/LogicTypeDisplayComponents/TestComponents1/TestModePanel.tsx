import React from "react";
import styles from "./testComponents.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";
// import { sectionTypeProps } from "../../../../../Utils/dataTypes";
import { useNavigate } from "react-router-dom";
// import ListEachItemOtherPropsComponent from "../../../../ListEachItemOtherProps_Component";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { VscRunAll } from "react-icons/vsc";
import ListEachItemOtherProps from "../../../../ListEachItemOtherProps";
import TestModeModalComponent from "./TestModeModal";

const TestModePanel: React.FC = () => {
  const { surveyData, createNavBTNLabel, logicNavBTNLabel } = useAppStateMgtContext();
  // const surveySections: sectionTypeProps = surveyData.sections;
  const navigate = useNavigate();
  // console.log(surveySections); //checking the sections content of the surveyData

  console.log(createNavBTNLabel, logicNavBTNLabel);
  const [showDescription, setShowDescription] = React.useState(false);
  const [requestState, setRequestState] = React.useState("");

  const handleRequest = (request: string) => {
    setRequestState(request);
    setShowDescription(true);
    // Add more request types as needed
  };

  // Accept an optional surveyId so callers can pass the id explicitly.
  const handleApproveRequest = (surveyId?: string) => {
    // Logic to approve the survey for testing
    console.log("Survey approved for testing", { surveyId });
    setShowDescription(false);
    // navigate to the testing interface for the survey and include the survey id
    // prefer explicit surveyId argument, else fallback to surveyData.id
    const idToUse = surveyId ?? surveyData?.id;
    if (idToUse) {
      // include the full survey in navigation state so the Test Runner can prefer
      // the passed object instead of having to reload from context/server
      navigate(`/surveys/test/${idToUse}`, { state: surveyData });
      console.log("how many sections:", surveyData.sections.length);
    } else {
      navigate("/surveys/test", { state: surveyData });
      console.log(
        "how many sections (no id trigger):",
        surveyData.sections.length
      );
    }
  };

  return (
    <div className={styles.testModePanel_wrapper}>
      <header className={styles.testModePanel_header}>
        <p>Test survey configurations</p>
      </header>
      <section className={styles.testModePanel_survey_main}>
        <div className={styles.testModePanel_survey_upper}>
          <h4 className={styles.testModePanel_surver_title}>
            {surveyData.title || "No survey title"}
          </h4>
          <div className={styles.testModePanel_survey_otherProps}>
            <ListEachItemOtherProps
              Icon={MdOutlineSpeakerNotes}
              toolTip="Description"
              getCallBack={() => handleRequest("description")}
            />
            <ListEachItemOtherProps
              Icon={VscRunAll}
              toolTip="Run Survey"
              getCallBack={() => handleRequest("approve")}
            />
          </div>
        </div>
        <TestModeModalComponent
          showDescription={showDescription}
          setShowDescription={setShowDescription}
          request={requestState}
          handleApproveRequest={() => handleApproveRequest(surveyData.id)}
        />
      </section>
    </div>
  );
};

export default TestModePanel;
