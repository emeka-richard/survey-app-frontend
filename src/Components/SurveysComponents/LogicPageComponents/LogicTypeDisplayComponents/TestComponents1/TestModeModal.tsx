import React from "react";
import styles from "./testComponents.module.css";
import TestModeModalDescription from "./TestModeModalDescription";
import ListEachItemOtherProps from "../../../../ListEachItemOtherProps";
import { MdCancel } from "react-icons/md";
import TestModeModalApprove from "./TestModeModalApprove";

const TestModeModalComponent: React.FC<{
  showDescription: boolean;
  setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
  request: string;
  // accept surveyId and pass to approve handler
  // surveyId?: string;
  handleApproveRequest: (surveyId?: string) => void;
}> = ({
  showDescription,
  setShowDescription,
  request,
  // surveyId,
  handleApproveRequest,
}) => {
  return (
    <section
      className={
        styles.testModePanel_description_modal +
        " " +
        (showDescription ? styles.description_display : styles.description_hide)
      }
    >
      <div className={styles.testModePanel_description_content}>
        <div className={styles.modal_cancel_icon}>
          <ListEachItemOtherProps
            Icon={MdCancel}
            toolTip="Close"
            getCallBack={() => setShowDescription(false)}
          />
        </div>
        {request === "description" ? (
          <TestModeModalDescription />
        ) : (
          <TestModeModalApprove
            setApproveModalClose={() => setShowDescription(false)}
            // pass surveyId through when calling approve
            handleApproveRequest={() => handleApproveRequest()}
          />
        )}
      </div>
    </section>
  );
};

export default TestModeModalComponent;
