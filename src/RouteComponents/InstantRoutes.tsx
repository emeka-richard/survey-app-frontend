import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  DashboardPage,
  ActivityPage,
  AnalyticsPage,
  NotificationsPage,
  ProjectsPage,
  ResourcesPage,
  SettingsPage,
  SurveysPage,
  UserProfilePage,
  ChatsPage,
  OnboardingLayout,
  LoginFormLayout,
  RegisterFormLayout,
  HomeAppLayout,
  ItemComponentLayout,
  CreateSurvey,
  TestRunnerPage
} from "./LazyRoutes";
import ErrorPage from "../ErrorPage";
import AuthWrapperLayout from "../Layouts/AuthLayouts/AuthWrapperLayout";
import AuthFrameLayout from "../Layouts/AuthLayouts/AuthFrameLayout";
import SpinIcon from "../Middlewares/SpinIcon/SpinIcon";
import { AppProvider } from "../Utils/AppContext";
import { SurveysTestRedirectWrapper } from "./BackUpRoutes";


export const InstantRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route errorElement={<ErrorPage />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<SpinIcon />}>
                <OnboardingLayout />
              </Suspense>
            }
          >
            <Route index element={<Navigate to="/login" />} />
            <Route element={<AuthWrapperLayout />}>
              <Route element={<AuthFrameLayout />}>
                <Route
                  path="/register"
                  element={
                    <Suspense fallback={<SpinIcon />}>
                      <RegisterFormLayout />
                    </Suspense>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<SpinIcon />}>
                      <LoginFormLayout />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
          </Route>
          <Route
            element={
              <Suspense fallback={<SpinIcon />}>
                <AppProvider>
                  <HomeAppLayout />
                </AppProvider>
              </Suspense>
            }
          >
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <DashboardPage />
                </Suspense>
              }
            />
            <Route
              element={
                <Suspense fallback={<SpinIcon />}>
                  <ItemComponentLayout />
                </Suspense>
              }
            >
              <Route
                path="/surveys"
                element={
                  <Suspense fallback={<SpinIcon />}>
                    <SurveysPage />
                  </Suspense>
                }
              >
                <Route
                  path="/surveys/create"
                  element={
                    <Suspense fallback={<SpinIcon />}>
                      <CreateSurvey />
                    </Suspense>
                  }
                />
                <Route
                  path="/surveys/test"
                  element={
                    <Suspense fallback={<SpinIcon />}>
                      {/* Redirect to the last/current survey test route when available */}
                      <SurveysTestRedirectWrapper />
                    </Suspense>
                  }
                />
                <Route
                  path="/surveys/test/:id"
                  element={
                    <Suspense fallback={<SpinIcon />}>
                      <TestRunnerPage />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route
              path="/projects"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <ProjectsPage />
                </Suspense>
              }
            />
            <Route
              path="/chats"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <ChatsPage />
                </Suspense>
              }
            />
            <Route
              path="/analytics"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <AnalyticsPage />
                </Suspense>
              }
            />
            <Route
              path="/notifications"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <NotificationsPage />
                </Suspense>
              }
            />
            <Route
              path="/activity"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <ActivityPage />
                </Suspense>
              }
            />
            <Route
              path="/resources"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <ResourcesPage />
                </Suspense>
              }
            />
            <Route
              path="/settings"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <SettingsPage />
                </Suspense>
              }
            />
            <Route
              path="/account"
              element={
                <Suspense fallback={<SpinIcon />}>
                  <UserProfilePage />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
