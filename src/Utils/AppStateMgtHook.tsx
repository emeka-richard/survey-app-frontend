import React from "react";
import {
  AvailableQuestionListFlatArrayProps,
  conditionStatementObjectArrayProps,
  QuestionFrameProps,
  QuestionTypeSelectList,
  sectionTypeProps,
  surveyTypeProps,
} from "./dataTypes";
import { questionTypeSelectListArray } from "../Components/SurveysComponents/builderPageComponents/QuestionComponents/questionTypeSelectListArray";
import { useNetworkConnectivityHook } from "./NetworkConnectivityHook";

export const useAppStateMgtHook = () => {
  const [accountUser, setAccountUser] = React.useState<string | null>(null);
  const [surveyCreator, setSurveyCreator] = React.useState<string | null>(null);
  const [createNavBTNLabel, setCreateNavBTNLabel] =
    React.useState<string>("Builder");
  const [logicNavBTNLabel, setLogicNavBTNLabel] =
    React.useState<string>("Skip/Branch");
  const [frameCall, setFrameCall] = React.useState<boolean>(false);
  const [isDropDownCardOpen, setIsDropDownCardOpen] =
    React.useState<boolean>(false);
  const [publishingStatus, setPublishingStatus] = React.useState<
    "Idle" | "Publishing" | "Published" | "Error" | "Offline"
  >("Idle");
  const [hydrated, setHydrated] = React.useState<boolean>(false);

  // Below Survey Data States
  // This sets up the empty question frame with the first question type from the list
  const createEmptyQuestion = (
    props: QuestionTypeSelectList[]
  ): QuestionFrameProps => ({
    id: crypto.randomUUID(),
    questionText: "",
    assignedPoint: 0,
    questionTypeValue: props[0].value,
    questionTypeLabel: props[0].label,
    questionTypeIcon: props[0].icon,
    required: false,
    logic: null,
  });

  // This sets up the section state to hold the sections and their questions
  const [sections, setSections] = React.useState<sectionTypeProps>([
    {
      id: crypto.randomUUID(),
      title: "Section 1",
      questionFrames: [createEmptyQuestion(questionTypeSelectListArray)],
    },
  ]);

  // The surveyID is generated using crypto.randomUUID() to ensure uniqueness
  const [currentSurveyID] = React.useState<string>(() => {
    return localStorage.getItem("currentSurveyID") ?? crypto.randomUUID();
  });

  // The state for the title of the survey
  const [surveyTitle, setSurveyTitle] = React.useState<string>("");

  // The state for the description of the survey
  const [surveyDescription, setSurveyDescription] = React.useState<string>("");

  // Initialising the survey data
  const [surveyData, setSurveyData] = React.useState<surveyTypeProps>({
    id: currentSurveyID,
    title: surveyTitle || "New survey",
    description: surveyDescription || "",
    sections: sections,
    modifiedAt: new Date().toISOString(),
    isDirty: true,
    surveyTags: [],
    status: "idle",
    accountUser: accountUser || "Anonymous",
    surveyCreator: surveyCreator || "Anonymous",
  });

  // The state for Skip/Branch logic
  const [logicIfQuestion, setLogicIfQuestion] =
    React.useState<AvailableQuestionListFlatArrayProps | null>(null);
  const [logicConditionStatement, setLogicConditionStatement] =
    React.useState<conditionStatementObjectArrayProps | null>(null);
  const [logicConditionValue, setLogicConditionValue] = React.useState<
    conditionStatementObjectArrayProps |string | number | null
  >(null);
  const [logicActionStatement, setLogicActionStatement] =
    React.useState<conditionStatementObjectArrayProps | null>(null);
  const [logicThenQuestion, setLogicThenQuestion] =
    React.useState<AvailableQuestionListFlatArrayProps | null>(null);
  // Network connection hook parsed here
  const { isNetworkConnected } = useNetworkConnectivityHook();

  return {
    createNavBTNLabel,
    setCreateNavBTNLabel,
    frameCall,
    setFrameCall,
    isDropDownCardOpen,
    setIsDropDownCardOpen,
    publishingStatus,
    setPublishingStatus,
    surveyTitle,
    setSurveyTitle,
    surveyDescription,
    setSurveyDescription,
    surveyData,
    setSurveyData,
    createEmptyQuestion,
    sections,
    setSections,
    currentSurveyID,
    isNetworkConnected,
    accountUser,
    setAccountUser,
    surveyCreator,
    setSurveyCreator,
    hydrated,
    setHydrated,
    logicNavBTNLabel,
    setLogicNavBTNLabel,
    logicIfQuestion,
    setLogicIfQuestion,
    logicConditionStatement,
    setLogicConditionStatement,
    logicConditionValue,
    setLogicConditionValue,
    logicActionStatement,
    setLogicActionStatement,
    logicThenQuestion,
    setLogicThenQuestion,
  };
};
