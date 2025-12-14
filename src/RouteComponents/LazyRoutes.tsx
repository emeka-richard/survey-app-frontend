import React from "react";

const ActivityPage = React.lazy(() => import("../AppPages/Activity"));
const AnalyticsPage = React.lazy(() => import("../AppPages/Analytics"));
const DashboardPage = React.lazy(() => import("../AppPages/Dashboard"));
const NotificationsPage = React.lazy(() => import("../AppPages/Notifications"));
const ProjectsPage = React.lazy(() => import("../AppPages/Projects"));
const ResourcesPage = React.lazy(() => import("../AppPages/Resources"));
const SettingsPage = React.lazy(() => import("../AppPages/Settings"));
const SurveysPage = React.lazy(() => import("../AppPages/Surveys"));
const UserProfilePage = React.lazy(() => import("../AppPages/UserProfile"));
const ChatsPage = React.lazy(() => import("../AppPages/Chats"));
const OnboardingLayout = React.lazy(
  () => import("../Layouts/AuthLayouts/OnboardingLayout")
);
const HomeAppLayout = React.lazy(
  () => import("../Layouts/HomeAppLayouts/HomeAppLayout")
);
const RegisterFormLayout = React.lazy(
  () => import("../Layouts/AuthLayouts/RegisterFormLayout")
);
const LoginFormLayout = React.lazy(
  () => import("../Layouts/AuthLayouts/LoginFormLayout")
);
const ItemComponentLayout = React.lazy(
  () => import("../Layouts/ItemComponentLayout")
);
const CreateSurvey = React.lazy(
  () => import("../Layouts/CreateSurveyLayouts/CreateSurvey")
);
const TestRunnerPage = React.lazy(
  () => import("../AppPages/CreateSurveyPages/TestRunnerPage")
);

export {
  CreateSurvey,
  ItemComponentLayout,
  OnboardingLayout,
  HomeAppLayout,
  RegisterFormLayout,
  LoginFormLayout,
  ChatsPage,
  ActivityPage,
  AnalyticsPage,
  DashboardPage,
  NotificationsPage,
  ProjectsPage,
  ResourcesPage,
  SettingsPage,
  SurveysPage,
  UserProfilePage,
  TestRunnerPage
};
