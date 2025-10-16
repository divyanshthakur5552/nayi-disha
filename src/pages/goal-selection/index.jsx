import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingStepIndicator from "../../components/ui/OnboardingStepIndicator";
import Button from "../../components/ui/Button";
import GoalCard from "./components/GoalCard";
import GoalComparisonModal from "./components/GoalComparisonModal";
import GoalSelectionHeader from "./components/GoalSelectionHeader";

const GoalSelection = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock goals data
  const goals = [
    {
      id: "web-development",
      type: "web-development",
      title: "Web Development",
      description:
        "Focus on creating beautiful, responsive websites and web applications. Master frontend technologies and user experience design.",
      focusAreas: [
        "HTML/CSS",
        "JavaScript",
        "React",
        "Responsive Design",
        "UI/UX",
      ],
      careerOutcomes: [
        "Frontend Developer",
        "UI/UX Engineer",
        "Web Designer",
        "JavaScript Developer",
      ],
      estimatedDuration: "3-4 months",
      difficulty: "Beginner to Intermediate",
      moduleCount: 8,
      skillsGained: [
        "Modern JavaScript",
        "React Framework",
        "CSS Grid & Flexbox",
        "API Integration",
      ],
    },
    {
      id: "data-structures",
      type: "data-structures",
      title: "Data Structures & Algorithms",
      description:
        "Master problem-solving skills and algorithmic thinking. Perfect for technical interviews and competitive programming.",
      focusAreas: [
        "Arrays & Strings",
        "Trees & Graphs",
        "Dynamic Programming",
        "System Design",
      ],
      careerOutcomes: [
        "Software Engineer",
        "Backend Developer",
        "Technical Lead",
        "Systems Architect",
      ],
      estimatedDuration: "4-6 months",
      difficulty: "Intermediate to Advanced",
      moduleCount: 12,
      skillsGained: [
        "Algorithm Design",
        "Problem Solving",
        "Code Optimization",
        "System Thinking",
      ],
    },
    {
      id: "full-stack",
      type: "full-stack",
      title: "Full-Stack Development",
      description:
        "Become a complete developer with both frontend and backend skills. Build end-to-end applications from scratch.",
      focusAreas: ["Frontend", "Backend", "Databases", "DevOps", "API Design"],
      careerOutcomes: [
        "Full-Stack Developer",
        "Software Architect",
        "Technical Consultant",
        "Startup CTO",
      ],
      estimatedDuration: "6-8 months",
      difficulty: "Intermediate to Advanced",
      moduleCount: 15,
      skillsGained: [
        "Full-Stack Architecture",
        "Database Design",
        "API Development",
        "Deployment",
      ],
    },
  ];

  // Load saved data on component mount
  useEffect(() => {
    const savedSubject = localStorage.getItem("adaptivelearn_selected_subject");
    const savedGoal = localStorage.getItem("adaptivelearn_selected_goal");

    if (savedSubject) {
      setSelectedSubject(JSON.parse(savedSubject));
    }

    if (savedGoal) {
      const goalData = JSON.parse(savedGoal);
      setSelectedGoal(goalData?.id);
    }
  }, []);

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId);

    // Save to localStorage
    const goalData = goals?.find((g) => g?.id === goalId);
    localStorage.setItem(
      "adaptivelearn_selected_goal",
      JSON.stringify(goalData)
    );

    // Save onboarding progress
    const onboardingData = JSON.parse(
      localStorage.getItem("adaptivelearn_onboarding") || "{}"
    );
    onboardingData.goal = goalData;
    onboardingData.currentStep = 3;
    onboardingData.completedSteps = ["subject", "goal"];
    localStorage.setItem(
      "adaptivelearn_onboarding",
      JSON.stringify(onboardingData)
    );
  };

  const handleContinue = async () => {
    if (!selectedGoal) return;

    setIsLoading(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    navigate("/skill-level-selection");
  };

  const handleBack = () => {
    navigate("/subject-selection");
  };

  const handleCompareGoals = () => {
    setShowComparison(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 gradient-bg opacity-30"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          {/* Step Indicator */}
          <OnboardingStepIndicator
            currentStep={2}
            totalSteps={4}
            onBack={handleBack}
            className="mb-12"
          />

          {/* Header */}
          <GoalSelectionHeader
            selectedSubject={selectedSubject?.name}
            onCompareGoals={handleCompareGoals}
            className="mb-12"
          />

          {/* Goal Cards */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goals?.map((goal) => (
                <GoalCard
                  key={goal?.id}
                  goal={goal}
                  isSelected={selectedGoal === goal?.id}
                  onSelect={() => handleGoalSelect(goal?.id)}
                  className="animate-fade-in"
                />
              ))}
            </div>
          </div>

          {/* Selected Goal Summary */}
          {selectedGoal && (
            <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
              <div className="glass-card border border-primary/30 rounded-lg p-6 bg-primary/5">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {goals?.find((g) => g?.id === selectedGoal)?.title}{" "}
                      Selected
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your personalized roadmap will include{" "}
                      {goals?.find((g) => g?.id === selectedGoal)?.moduleCount}{" "}
                      modules designed to achieve your career goals in{" "}
                      {
                        goals?.find((g) => g?.id === selectedGoal)
                          ?.estimatedDuration
                      }
                      .
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goals
                        ?.find((g) => g?.id === selectedGoal)
                        ?.skillsGained?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-md border border-primary/30"
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Button
              variant="outline"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="hover:bg-white/5"
            >
              Back
            </Button>

            <Button
              variant="default"
              onClick={handleContinue}
              disabled={!selectedGoal}
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
              className="floating-action"
            >
              Continue
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Don't worry - you can change your goal anytime from your dashboard
            </p>
          </div>
        </div>
      </div>
      {/* Comparison Modal */}
      <GoalComparisonModal
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        goals={goals}
      />
    </div>
  );
};

export default GoalSelection;
