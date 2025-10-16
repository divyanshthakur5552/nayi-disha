import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import ProgressNavigationBar from "../../components/ui/ProgressNavigationBar";
import RoadmapHeader from "./components/RoadmapHeader";
import RoadmapTimeline from "./components/RoadmapTimeline";
import QuickActions from "./components/QuickActions";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const AIGeneratedRoadmap = () => {
  const [viewMode, setViewMode] = useState("timeline");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Mock roadmap data - in real app this would come from localStorage or API
  const mockRoadmapData = {
    id: "roadmap_js_fullstack_intermediate",
    title: "JavaScript Full Stack Development",
    description:
      "A comprehensive learning path tailored to your intermediate skill level, focusing on modern JavaScript development and full-stack web applications. This roadmap adapts to your progress and provides personalized recommendations.",
    totalModules: 10,
    estimatedTime: "32-42 hours",
    difficulty: "Intermediate",
    completedModules: 3,
    createdAt: new Date()?.toISOString(),
    lastUpdated: new Date()?.toISOString(),
    userSelections: {
      subject: "JavaScript",
      goal: "Full Stack Development",
      skillLevel: "Intermediate",
    },
    aiRecommendations: [
      "Focus on practical projects to reinforce theoretical concepts",
      "Practice coding daily for 1-2 hours to maintain momentum",
      "Join developer communities for peer learning and support",
      "Build a portfolio project after completing each major section",
    ],
    overallProgress: 30,
  };

  useEffect(() => {
    // Simulate loading roadmap data
    setIsLoading(true);

    // Check if coming from skill level selection with new roadmap
    const isNewRoadmap = location?.state?.fromSkillSelection;

    setTimeout(() => {
      // In real app, load from localStorage or generate new roadmap
      const savedRoadmap = localStorage.getItem("adaptivelearn_roadmap");

      if (savedRoadmap && !isNewRoadmap) {
        setRoadmapData(JSON.parse(savedRoadmap));
      } else {
        // Generate new roadmap or use mock data
        setRoadmapData(mockRoadmapData);
        localStorage.setItem(
          "adaptivelearn_roadmap",
          JSON.stringify(mockRoadmapData)
        );
      }

      setIsLoading(false);
    }, 1500);
  }, [location?.state]);

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleModuleStart = (module) => {
    // Save current module to localStorage
    localStorage.setItem(
      "adaptivelearn_current_module",
      JSON.stringify(module)
    );

    // Navigate to quiz interface
    navigate("/module-quiz-interface", {
      state: {
        module,
        fromRoadmap: true,
      },
    });
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case "continue":
        // Find the first in-progress or available module
        const currentModule = mockRoadmapData?.modules?.find(
          (m) => m?.status === "in-progress" || m?.status === "available"
        );
        if (currentModule) {
          handleModuleStart(currentModule);
        } else {
          navigate("/module-quiz-interface");
        }
        break;

      case "dashboard":
        navigate("/dashboard");
        break;

      case "goals":
        navigate("/goal-selection");
        break;

      case "regenerate":
        setIsLoading(true);
        setTimeout(() => {
          // Reset roadmap and navigate to skill selection
          localStorage.removeItem("adaptivelearn_roadmap");
          navigate("/skill-level-selection");
        }, 1000);
        break;

      default:
        console.log("Unknown action:", actionId);
    }
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <ProgressNavigationBar
          isVisible={false}
          overallProgress={roadmapData?.overallProgress || 0}
        />

        <main className="pt-32 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse neon-glow">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gradient mb-3">
                  Generating Your Roadmap
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Our AI is creating a personalized learning path based on your
                  selections. This may take a few moments.
                </p>
                <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressNavigationBar
        isVisible={true}
        overallProgress={roadmapData?.overallProgress || 0}
        totalModules={roadmapData?.totalModules || 0}
      />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <RoadmapHeader
                roadmapData={roadmapData}
                onFilterChange={handleFilterChange}
                currentFilter={currentFilter}
                onViewModeChange={handleViewModeChange}
                viewMode={viewMode}
              />

              <RoadmapTimeline
                viewMode={viewMode}
                currentFilter={currentFilter}
                onModuleStart={handleModuleStart}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              {/* Quick Actions Toggle for Mobile */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleQuickActions}
                  iconName={showQuickActions ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  className="w-full"
                >
                  Quick Actions
                </Button>
              </div>

              {/* Quick Actions Panel */}
              <div
                className={`
                ${showQuickActions ? "block" : "hidden lg:block"}
                animate-fade-in
              `}
              >
                <QuickActions
                  onAction={handleQuickAction}
                  completedModules={roadmapData?.completedModules || 0}
                  totalModules={roadmapData?.totalModules || 0}
                />
              </div>
            </div>
          </div>

          {/* Empty State for No Roadmap */}
          {!roadmapData && !isLoading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
                <Icon
                  name="MapPin"
                  size={40}
                  className="text-muted-foreground"
                />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                No Roadmap Found
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                It looks like you haven't created a learning roadmap yet.
                Complete the onboarding process to generate your personalized
                learning path.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  onClick={() => navigate("/subject-selection")}
                  iconName="Play"
                  iconPosition="left"
                >
                  Start Onboarding
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/landing-page")}
                  iconName="Home"
                  iconPosition="left"
                >
                  Go Home
                </Button>
              </div>
            </div>
          )}

          {/* Floating Action Button for Mobile */}
          <div className="fixed bottom-6 right-6 lg:hidden">
            <Button
              variant="default"
              size="lg"
              onClick={() => {
                const availableModule = mockRoadmapData?.modules?.find(
                  (m) =>
                    m?.status === "available" || m?.status === "in-progress"
                );
                if (availableModule) {
                  handleModuleStart(availableModule);
                } else {
                  navigate("/module-quiz-interface");
                }
              }}
              iconName="Play"
              className="w-14 h-14 rounded-full shadow-lg neon-glow floating-action"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIGeneratedRoadmap;
