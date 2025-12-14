import React from "react";
import { useAppStateMgtContext } from "../Utils/AppContext";
import { Navigate } from "react-router-dom";
import {TestRunnerPage} from "./LazyRoutes";

export const SurveysTestRedirectWrapper: React.FC = () => {
  const { currentSurveyID } = useAppStateMgtContext();
  if (currentSurveyID) return <Navigate to={`/surveys/test/${currentSurveyID}`} replace />;
  // no last survey id known — render the generic test runner page
  return <TestRunnerPage />;
};
