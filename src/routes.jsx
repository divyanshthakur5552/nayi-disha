import React from "react";
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import GoalSelection from "./pages/goal-selection";
import SkillLevelSelection from "./pages/skill-level-selection";
import LandingPage from "./pages/landing-page";
import AIGeneratedRoadmap from "./pages/ai-generated-roadmap";
import ModuleQuizInterface from "./pages/module-quiz-interface";
import SubjectSelection from "./pages/subject-selection";
import ProfileModal from "pages/Profile";

function ModalSwitch() {
  const location = useLocation();
  const state = location.state;
  const background = state && state.background;

  return (
    <ErrorBoundary>
      <ScrollToTop />

      {/* Always render normal routes */}
      <RouterRoutes location={background || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/goal-selection" element={<GoalSelection />} />
        <Route
          path="/skill-level-selection"
          element={<SkillLevelSelection />}
        />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/ai-generated-roadmap" element={<AIGeneratedRoadmap />} />
        <Route
          path="/module-quiz-interface"
          element={<ModuleQuizInterface />}
        />
        <Route path="/subject-selection" element={<SubjectSelection />} />

        {/* Direct access to /profile should show full page */}
        <Route
          path="/profile"
          element={
            <ProfileModal isOpen onClose={() => (window.location.href = "/")} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>

      {/* If background exists, render modal on top */}
      {background && (
        <RouterRoutes>
          <Route
            path="/profile"
            element={
              <ProfileModal isOpen onClose={() => window.history.back()} />
            }
          />
        </RouterRoutes>
      )}
    </ErrorBoundary>
  );
}

export default function Routes() {
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}
