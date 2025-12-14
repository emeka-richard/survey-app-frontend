import React from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { IconName } from "../Components/SurveysComponents/builderPageComponents/QuestionComponents/questionTypeSelectListArray";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

// Interface for APP Contexts
export interface AppContextProps {
  createNavBTNLabel: string;
  setCreateNavBTNLabel: React.Dispatch<React.SetStateAction<string>>;
  frameCall: boolean;
  setFrameCall: React.Dispatch<React.SetStateAction<boolean>>;
  isDropDownCardOpen: boolean;
  setIsDropDownCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  publishingStatus: "Idle" | "Publishing" | "Published" | "Error" | "Offline";
  setPublishingStatus: React.Dispatch<
    React.SetStateAction<
      "Idle" | "Publishing" | "Published" | "Error" | "Offline"
    >
  >;
  surveyData: surveyTypeProps;
  setSurveyData: React.Dispatch<React.SetStateAction<surveyTypeProps>>;
  surveyTitle: string;
  setSurveyTitle: React.Dispatch<React.SetStateAction<string>>;
  surveyDescription: string;
  setSurveyDescription: React.Dispatch<React.SetStateAction<string>>;
  createEmptyQuestion: (props: QuestionTypeSelectList[]) => QuestionFrameProps;
  sections: sectionTypeProps;
  setSections: React.Dispatch<React.SetStateAction<sectionTypeProps>>;
  currentSurveyID: string;
  isNetworkConnected: boolean;
  accountUser: string | null;
  setAccountUser: React.Dispatch<React.SetStateAction<string | null>>;
  surveyCreator: string | null;
  setSurveyCreator: React.Dispatch<React.SetStateAction<string | null>>;
  hydrated: boolean;
  setHydrated: React.Dispatch<React.SetStateAction<boolean>>;
  logicNavBTNLabel: string;
  setLogicNavBTNLabel: React.Dispatch<React.SetStateAction<string>>;
  logicIfQuestion: AvailableQuestionListFlatArrayProps | null;
  setLogicIfQuestion: React.Dispatch<
    React.SetStateAction<AvailableQuestionListFlatArrayProps | null>
  >;
  logicConditionStatement: conditionStatementObjectArrayProps | null;
  setLogicConditionStatement: React.Dispatch<
    React.SetStateAction<conditionStatementObjectArrayProps | null>
  >;
  logicConditionValue:
    | conditionStatementObjectArrayProps
    | string
    | number
    | null;
  setLogicConditionValue: React.Dispatch<
    React.SetStateAction<
      conditionStatementObjectArrayProps | string | number | null
    >
  >;
  logicActionStatement: conditionStatementObjectArrayProps | null;
  setLogicActionStatement: React.Dispatch<
    React.SetStateAction<conditionStatementObjectArrayProps | null>
  >;
  logicThenQuestion: AvailableQuestionListFlatArrayProps | null;
  setLogicThenQuestion: React.Dispatch<
    React.SetStateAction<AvailableQuestionListFlatArrayProps | null>
  >;
}

// export type QuestionTypeSelectList = {
//   value: string;
//   label: string;
//   icon: IconType | null;
// };
export type QuestionTypeSelectList = {
  value: string;
  label: string;
  icon: IconName | null;
};

// file metadata for file-upload questions
export type FileUploadMeta = {
  id: string;
  name: string;
  size?: number;
  mimeType?: string;
  url?: string; // stored URL or blob reference
  uploadedAt?: string; // ISO datetime
};

// unified response/default value type that covers all question types
export type ResponseValue =
  | string // text, single-select option, date/time ISO, etc.
  | number // rating or numeric responses
  | boolean // if/when boolean question exists
  | string[] // checkboxes or multi-value responses
  | number[] // numeric list if needed
  | FileUploadMeta[]; // files uploaded

// This defines the structure of a survey section & question frames
// Then update QuestionFrameProps:
export type QuestionFrameProps = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  questionText: string;
  assignedPoint: number;
  questionTypeValue: string;
  questionTypeLabel: string;
  questionTypeIcon: IconName | null;
  questionTypeOptions?: string[]; // for options-based questions
  required: boolean;
  logic: LogicCondition[] | null;

  // whether to randomize choice order for this question (authoring metadata)
  shuffleChoices?: boolean;

  // Default / prefill properties
  defaultValue?: ResponseValue | null;
  defaultEditable?: boolean;
  defaultSource?: string; // e.g., 'static' | 'url' | 'crm'

  // Optional attribute meta (helps quota/logic UIs reference question attribute)
  // attribute can be a simple string (legacy) or a structured object with metadata
  advancedConfigData?: {
        attributeName: string;
        attributeValues: string[];
        variableName?: string;
        // capture flags for hidden metadata fields
        captureMetaData?: {
          response_start_time?: boolean;
          response_end_time?: boolean;
          device_type?: boolean;
          browser_info?: boolean;
          referrer_url?: boolean;
        };
      };

  // (optional) current response value on the respondent side
  responseValue?: ResponseValue | null;
};

export type sectionTypeProps = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  questionFrames: QuestionFrameProps[];
}[];

// QuestionFrameComponentProps defines the props for QuestionFrame component
// Used: QuestionFrame.tsx
export type QuestionFrameComponentProps = {
  sectionId: string;
  questionType: QuestionFrameProps;
  onRemoveQuestionFrame: (sectionId: string, questionId: string) => void;
  dragHandleProps: DragHandleProps;
  itemIndex: number;
  sectionIndex: number;
  totalSections: number;
};

// Used: QuestionInputFrame.tsx
export type QuestionInputFrameComponentProps = {
  questionFrame: QuestionFrameProps;
  sectionId: string;
  questionType?: string;
};

// Used: QuestionInputFrame.tsx
export type QuestionOptionItem = {
  id: string,
  text: string,
}

// QuestionFooterPropsType defines the props for QuestionFooter component
// Used: QuestionFooter.tsx
export type QuestionFooterPropsType = {
  sectionId: string;
  questionId: string;
  onRemoveQuestionFrame: (sectionId: string, questionId: string) => void;
  dragHandleProps: DragHandleProps;
  itemIndex: number;
  sectionIndex: number;
  totalSections: number;
};

// Logic Rule Props Types
export type LogicCondition = {
  id: string; // unique id for this condition
  questionId: QuestionFrameProps["id"]; // which question it targets
  operator: string;
  value: string | number | conditionStatementObjectArrayProps;
  logicAction: LogicAction[];
};
export type LogicAction = {
  logicActionId: string;
  actionType: string;
  targetSectionId: string;
  targetQuestionId: string;
};
// export type QuestionLogic = {
//   conditions: LogicCondition[];
//   actions: LogicAction[];
// };

// This defines the structure of a survey draft
export type surveyTypeProps = {
  id: string;
  title: string;
  description?: string;
  sections: sectionTypeProps;
  modifiedAt: string;
  isDirty: boolean;
  surveyTags: string[];
  status:
    | "idle"
    | "draft"
    | "in-progress"
    | "enqueue"
    | "published"
    | "conflict"
    | "offline";
  accountUser?: string | null; // Property for account user
  surveyCreator?: string | null; // Optional property for survey creator
  // Optional quotas metadata (authoring-only)
  quotas?: Quota[];
};

// Quota type shared by Quotas components
export type Quota = {
  id: string;
  name: string;
  attribute: string;
  values: string[];
  limit: number;
  count: number;
  action: "terminate" | "redirect" | "message";
  actionTarget?: string;
  // optional additional config when action is redirect or message
  redirectUrl?: string;
  displayMessage?: string;
};

// Default/Prefill components props
export type DefaultPrefilRowProps = {
  question: QuestionFrameProps;
  onChange: (delta: Partial<QuestionFrameProps>) => void;
  questionNumber?: string;
};

export type DefaultprefilRenderProps = {
  localSections: sectionTypeProps;
  getQuestionNumber: (
    sectionIdx: number,
    questionIdx: number,
    totalSections: number
  ) => string;
  onRowChange: (
    sectionId: string,
    questionId: string,
    delta: Partial<QuestionFrameProps>
  ) => void;
};

export type DefaultPrefilButtonVariant = "primary" | "secondary";

export type DefaultPrefilButtonProps = {
  buttonLabel: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: DefaultPrefilButtonVariant;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

// Quota component prop types
export type QuotaRowProps = {
  quota: Quota;
  onEdit: (q: Quota) => void;
  onDelete: (id: string) => void;
};

export type AddEditQuotaModalProps = {
  initial?: Quota;
  onClose: () => void;
  onSave: (q: Quota) => void;
  availableAttributes: string[];
  // optional mapping from attribute name -> available option strings (for dropdown/checklist)
  attributeOptions?: Record<string, string[]>;
};

// Panel props for Default Prefil panel
export type DefaultPrefilPanelProps = {
  onClose?: () => void;
};

// Type for AutoSaveHook Props
export type AutoDraftSaveHookProps = {
  data: surveyTypeProps;
  markClean: () => void;
  delay: number;
};

// Interface for the metadata of a draft survey
export interface DraftMetadata {
  id: string;
  title: string;
  updatedAt: string;
}

// Interface for Sortable List Abstract Component Props
export type SortableListProps<T> = {
  items: T[];
  getId: (item: T) => string;
  onReorder: (newItems: T[]) => void;
  renderItem: (
    item: T,
    index: number,
    dragHandleProps: DragHandleProps
  ) => React.ReactNode;
};

// Interface for Drag Handle Props for Sortable List
export type DragHandleProps = {
  attributes: DraggableAttributes;
  listeners?: SyntheticListenerMap;
};

export type LogicTypeSelectProps = {
  logicTypeSelectArray: string[];
};

// export type getQuestionNumberProps = {
//   sectionIndex: number;
//   itemIndex: number;
//   totalSections: number;
// }

// Interface for AvailableQuestionListFlatArray
// This is used in AvailableQuestionListFlatArray.tsx
export type AvailableQuestionListFlatArrayProps = {
  questionFrame: QuestionFrameProps;
  ownSectionProps: {
    sectionId: string;
    sectionTitle: string;
  };
  questionSectionIndexNumber: number;
  questionItemIndexNumber: number;
  questionNumber: string;
  availableQuestionArrayIndex: number;
};

// ConditionStatementObjectArray
// Used: ConditionSelector.tsx
export type conditionStatementObjectArrayProps = {
  label: string;
  value: string;
};

// Used: RuleSetter.tsx, AvailableQuestionListDisplay.tsx, ConditionStatementSelector.tsx
export type AnotherDropDownProps = {
  isAnotherDropDown: boolean;
  setIsAnotherDropDown: (value: React.SetStateAction<boolean>) => void;
};

export type SelectorDropDownProps = {
  tag: string;
  isAnotherDropDown: boolean;
  // setIsAnotherDropDown: (value: React.SetStateAction<boolean>) => void;
  handleOnclick: () => void;
  handleAvailableQuestionUpdate: (
    optionProps:
      | conditionStatementObjectArrayProps
      | AvailableQuestionListFlatArrayProps
  ) => void;
  isAvailableQuestionListOpen: boolean;
  RenderObjectArray:
    | conditionStatementObjectArrayProps[]
    | AvailableQuestionListFlatArrayProps[];
};

export type questionsWithLogicFxnType = {
  sectionTitle: string;
  sectionID: string;
  question: QuestionFrameProps;
  questionIndex: number;
  ifQuestionNumber: string;
  thenQuestionNumberMap: Record<string, thenQuestionStringProps>;
};

export type thenQuestionStringProps = {
  thenQuestionId: string;
  thenQuestionNumber: string;
};

export type skipLogicEditDeleteBTNProps = {
  buttonLabel: string;
  sectionId: string;
  questionId: string;
  conditionId: string;
};

// -----------------------------------------------------------------------------
// Scoring types
// Types used by the Scoring UI components (ScoringSideBar, EachScoringPoint_Control)
// These centralised types live here so multiple components can import shared
// type definitions and remain consistent.
// -----------------------------------------------------------------------------

// Per-section totals used in scoring preview
export type ScoringPerSectionTotal = {
  sectionId: string;
  title: string;
  total: number;
};

// Aggregate totals structure (per-section and grand total)
export type ScoringComputeTotals = {
  perSection: ScoringPerSectionTotal[];
  grandTotal: number;
};

// Props for the Scoring sidebar component
export type ScoringSideBarProps = {
  applyAllValue: number;
  setApplyAllValue: React.Dispatch<React.SetStateAction<number>>;
  applyPointsToAll: (value: number) => void;
  computeTotals: ScoringComputeTotals;
};

// Props for the per-question points control component
export type EachScoringPointControlProps = {
  sectionId: string;
  questionId: string;
  assignedPoint?: number | null;
  onPointChange: (sectionId: string, questionId: string, value: number) => void;
};

// -----------------------------------------------------------------------------// Piping types
export type AvailableQuestionForPiping = {
  id: string;
  qNumb: string;
  text: string;
  label: string;
};

// -----------------------------------------------------------------------------

// Used: usePipingHandleFxns.ts
export type UsePipingArgs = {
  sections: sectionTypeProps;
  getQuestionNumber: (
    sectionIndex: number,
    itemIndex: number,
    totalSections: number
  ) => string;
  receiverText: string;
  setReceiverText: React.Dispatch<React.SetStateAction<string>>;
  delimiter: string;
  fallback: string;
  // Optional helpers needed for editing & persisting from the piping UI
  setSections?: React.Dispatch<React.SetStateAction<sectionTypeProps>>;
  selectedQuestionId?: string;
};

// -----------------------------------------------------------------------------

export type PipingSidebarProps = {
  availableQuestions: AvailableQuestionForPiping[];
  insertTokenFor: (id: string) => void;
};

// -----------------------------------------------------------------------------
export type TestRunnerButtonTypes = {
  buttonLabel: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

export type TestRunnerStatsProps = {
    statFigure: number;
    label: string;
};