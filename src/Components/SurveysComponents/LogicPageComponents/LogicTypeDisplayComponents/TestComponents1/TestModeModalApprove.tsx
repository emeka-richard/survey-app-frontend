import React from "react";
import styles from "./testComponents.module.css";
// import { useAppStateMgtContext } from "../../../../../Utils/AppContext";

const TestModeModalApprove: React.FC<{
  setApproveModalClose: () => void;
  // accept optional surveyId forwarded from parent via closure
  handleApproveRequest: (surveyId?: string) => void;
}> = ({ setApproveModalClose, handleApproveRequest }) => {
  //   const { surveyData } = useAppStateMgtContext();

  return (
    <div className={styles.testModePanel_approve_textContent}>
      <h4 className={styles.testModePanel_approve_title}>
        Approve Survey for Testing
      </h4>
      <hr />
      <div className={styles.testModePanel_approve_text}>
        <p className={styles.testModePanel_approve_subtext}>
          Are you sure you want to approve this survey for testing? Once
          approved, the survey will be locked for editing and can only be
          tested.
        </p>
        <span className={styles.testModePanel_approve_warning}>
          Warning: <i>Approving the survey will prevent any further edits until the
          testing phase is complete.</i>
        </span>
      </div>
      <span className={styles.testModePanel_approve_buttons}>
        <button
          className={styles.testModePanel_approve_button_cancel}
          onClick={() => setApproveModalClose()}
        >
          Cancel
        </button>
        <button
          className={styles.testModePanel_approve_button_confirm}
          onClick={() => handleApproveRequest()}
        >
          Approve
        </button>
      </span>
    </div>
  );
};

export default TestModeModalApprove;
