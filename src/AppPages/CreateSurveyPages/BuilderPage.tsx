import React from "react";
import style from "./createSurveyPages.module.css";
import BuilderContentHeader from "../../Components/SurveysComponents/builderPageComponents/BuilderContentHeader";
import BuilderContentBody from "../../Components/SurveysComponents/builderPageComponents/BuilderContentBody";
import { useBuilderPageFxns } from "../../Utils/useBuilderPageFxns";

const BuilderPage = () => {


  const {
    addSection,
    deleteSection,
    addQuestionFrameToSection,
    addQuestionFrameToLastSection,
    onRemoveQuestionFrame,
  } = useBuilderPageFxns();


  return (
    <section className={style.builderPage_wrapper}>
      <section className={style.builderPage_header}>
        <BuilderContentHeader
          // onAddQuestion={addQuestionFrame}
          addSection={addSection}
          addQuestionFrameToSection={addQuestionFrameToSection}
          addQuestionFrameToLastSection={addQuestionFrameToLastSection}
        />
      </section>
      <BuilderContentBody
        addSection={addSection}
        addQuestionFrameToSection={addQuestionFrameToSection}
        // chooseDiffQuestionType={chooseDiffQuestionType}
        onRemoveQuestionFrame={onRemoveQuestionFrame}
        deleteSection={deleteSection}
      />
    </section>
  );
};

export default BuilderPage;
