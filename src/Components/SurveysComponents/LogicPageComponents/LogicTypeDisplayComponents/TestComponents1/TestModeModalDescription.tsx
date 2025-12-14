import React from "react";
import styles from "./testComponents.module.css";
import { useAppStateMgtContext } from "../../../../../Utils/AppContext";


const TestModeModalDescription: React.FC = ()=>{
      const { surveyData } = useAppStateMgtContext();
    
    return(
            <div className={styles.testModePanel_description_textContent}>
              <h4 className={styles.testModePanel_description_title}>
                Survey Description
              </h4>
              <hr />
              {!surveyData.description ? (
                <p className={styles.testModePanel_noDescription}>
                  No survey description.
                </p>
              ) : (
                <p className={styles.testModePanel_description_text}>
                  {surveyData.description}
                </p>
              )}
            </div>
    )
}

export default TestModeModalDescription;