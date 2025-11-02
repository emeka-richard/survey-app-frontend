import style from "./createSurveyPages.module.css";
import LogicTypeRouter from "../../Components/SurveysComponents/LogicPageComponents/LogicTypeRouter";
import LogicTypeSelectComponent from "../../Components/SurveysComponents/LogicPageComponents/LogicTypeSelectComponent";
// import { useAutoDraftSaveHook } from "../../Utils/AutoDraftSaveHook";
// import { useAppStateMgtContext } from "../../Utils/AppContext";
// import { getSurveyDraftById } from "../../Utils/IndexDBs/surveyDraftIndexDBStorage";

const LogicPage = () => {
  const logicTypeSelectArray: string[] = [
    "Skip/Branch",
    "Scoring",
    "Piping",
    "Prefill",
    "Quotas",
    "Test Mode",
  ];

  return (
    <section className={style.logicPage_wrapper}>
      <LogicTypeSelectComponent logicTypeSelectArray={logicTypeSelectArray} />
      <LogicTypeRouter />
    </section>
  );
};

export default LogicPage;
