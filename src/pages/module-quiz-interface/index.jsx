import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/ui/Header";
import ProgressNavigationBar from "../../components/ui/ProgressNavigationBar";
import LearningContextBreadcrumb from "../../components/ui/LearningContextBreadcrumb";
import QuizHeader from "./components/QuizHeader";
import QuestionCard from "./components/QuestionCard";
import QuizControls from "./components/QuizControls";
import AdaptiveFeedback from "./components/AdaptiveFeedback";
import QuizSidebar from "./components/QuizSidebar";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const ModuleQuizInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get module data from navigation state or use default
  const moduleData = location?.state?.module || {
    id: 2,
    title: "DOM Manipulation",
    description: "Learn to interact with HTML elements using JavaScript",
    difficultyLevel: "intermediate",
    totalQuestions: 15,
  };

  // Quiz state management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [streakCount, setStreakCount] = useState(0);
  const [rollingWindow, setRollingWindow] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState("medium");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock questions data with adaptive difficulty
  const [questions] = useState([
    {
      id: 1,
      number: 1,
      text: "What method is used to select an element by its ID in JavaScript?",
      topic: "Element Selection",
      difficulty: "easy",
      codeExample: `// Select element with ID 'myButton'\nconst button = ?`,
      options: [
        { id: "a", label: "A", text: 'document.getElementById("myButton")' },
        { id: "b", label: "B", text: 'document.querySelector("#myButton")' },
        { id: "c", label: "C", text: 'document.getElementByClass("myButton")' },
        { id: "d", label: "D", text: "Both A and B are correct" },
      ],
      correctAnswer: "d",
      explanation:
        "Both getElementById() and querySelector() with # selector can be used to select elements by ID. getElementById() is more specific and slightly faster, while querySelector() is more flexible.",
    },
    {
      id: 2,
      number: 2,
      text: "Which event listener method allows you to remove the event later?",
      topic: "Event Handling",
      difficulty: "medium",
      context:
        "Consider scenarios where you need to clean up event listeners to prevent memory leaks.",
      options: [
        { id: "a", label: "A", text: "onclick property" },
        { id: "b", label: "B", text: "addEventListener()" },
        { id: "c", label: "C", text: "attachEvent()" },
        { id: "d", label: "D", text: "onEvent() method" },
      ],
      correctAnswer: "b",
      explanation:
        "addEventListener() paired with removeEventListener() allows you to add and remove event listeners. This is crucial for preventing memory leaks in dynamic applications.",
    },
    {
      id: 3,
      number: 3,
      text: "What is the difference between innerHTML and textContent?",
      topic: "Dynamic Content",
      difficulty: "medium",
      codeExample: `const div = document.querySelector('div');\ndiv.innerHTML = '<span>Hello</span>';\ndiv.textContent = '<span>Hello</span>';`,
      options: [
        {
          id: "a",
          label: "A",
          text: "innerHTML parses HTML, textContent treats everything as plain text",
        },
        { id: "b", label: "B", text: "textContent is faster than innerHTML" },
        {
          id: "c",
          label: "C",
          text: "innerHTML is more secure than textContent",
        },
        { id: "d", label: "D", text: "Both A and B are correct" },
      ],
      correctAnswer: "d",
      explanation:
        "innerHTML parses and renders HTML tags, while textContent treats everything as plain text. textContent is also generally faster and safer against XSS attacks.",
    },
    {
      id: 4,
      number: 4,
      text: "How do you prevent the default behavior of an event?",
      topic: "Event Handling",
      difficulty: "easy",
      options: [
        { id: "a", label: "A", text: "event.preventDefault()" },
        { id: "b", label: "B", text: "event.stopPropagation()" },
        { id: "c", label: "C", text: "return false" },
        { id: "d", label: "D", text: "event.cancel()" },
      ],
      correctAnswer: "a",
      explanation:
        "event.preventDefault() prevents the default action of an event from occurring, such as preventing a form submission or link navigation.",
    },
    {
      id: 5,
      number: 5,
      text: "Which method creates a new element in the DOM?",
      topic: "Element Creation",
      difficulty: "easy",
      options: [
        { id: "a", label: "A", text: "document.createElement()" },
        { id: "b", label: "B", text: "document.newElement()" },
        { id: "c", label: "C", text: "document.addElement()" },
        { id: "d", label: "D", text: "document.makeElement()" },
      ],
      correctAnswer: "a",
      explanation:
        "document.createElement() creates a new HTML element that can then be configured and added to the DOM using methods like appendChild().",
    },
  ]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(
      `quiz_progress_${moduleData?.id}`
    );
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setCurrentQuestionIndex(progress?.currentQuestionIndex || 0);
      setCompletedQuestions(progress?.completedQuestions || []);
      setTimeElapsed(progress?.timeElapsed || 0);
      setStreakCount(progress?.streakCount || 0);
      setRollingWindow(progress?.rollingWindow || []);
      setCurrentDifficulty(progress?.currentDifficulty || "medium");
    }
  }, [moduleData?.id]);

  // Save progress to localStorage
  const saveProgress = () => {
    const progress = {
      currentQuestionIndex,
      completedQuestions,
      timeElapsed,
      streakCount,
      rollingWindow,
      currentDifficulty,
      lastUpdated: new Date()?.toISOString(),
    };
    localStorage.setItem(
      `quiz_progress_${moduleData?.id}`,
      JSON.stringify(progress)
    );
  };

  // Calculate current accuracy
  const calculateAccuracy = () => {
    if (completedQuestions?.length === 0) return 0;
    const correct = completedQuestions?.filter((q) => q?.isCorrect)?.length;
    return (correct / completedQuestions?.length) * 100;
  };

  // Adaptive difficulty algorithm using rolling window
  const updateDifficulty = (isCorrect) => {
    const newWindow = [...rollingWindow, isCorrect]?.slice(-3); // Keep last 3 answers
    setRollingWindow(newWindow);

    if (newWindow?.length >= 3) {
      const correctCount = newWindow?.filter(Boolean)?.length;

      if (correctCount >= 3) {
        setCurrentDifficulty("hard");
        return "increased";
      } else if (correctCount <= 1) {
        setCurrentDifficulty("easy");
        return "decreased";
      } else {
        setCurrentDifficulty("medium");
        return "maintained";
      }
    }
    return null;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerId) => {
    if (!isSubmitted) {
      setSelectedAnswer(answerId);
    }
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isSubmitted) return;

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const currentQuestion = questions?.[currentQuestionIndex];
      const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

      // Update streak
      if (isCorrect) {
        setStreakCount((prev) => prev + 1);
      } else {
        setStreakCount(0);
      }

      // Update difficulty and get change info
      const difficultyChange = updateDifficulty(isCorrect);

      // Record completed question
      const questionResult = {
        questionId: currentQuestion?.id,
        selectedAnswer,
        correctAnswer: currentQuestion?.correctAnswer,
        isCorrect,
        timeSpent,
        difficulty: currentQuestion?.difficulty,
      };

      setCompletedQuestions((prev) => [...prev, questionResult]);
      setIsSubmitted(true);
      setIsLoading(false);

      // Show feedback
      setFeedbackData({
        isCorrect,
        streakCount: isCorrect ? streakCount + 1 : 0,
        difficultyChange,
        accuracy: calculateAccuracy(),
      });
      setShowFeedback(true);

      // Save progress
      saveProgress();

      // Show toast notification
      const message = isCorrect
        ? "Correct! Well done."
        : "Incorrect. Review the explanation.";
      // Toast notification would be implemented here
    }, 1000);
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowHint(false);
      setQuestionStartTime(Date.now());
      saveProgress();
    }
  };

  // Handle quiz completion
  const handleFinishQuiz = () => {
    const finalAccuracy = calculateAccuracy();
    const totalTime = timeElapsed;

    // Save final results
    const quizResults = {
      moduleId: moduleData?.id,
      moduleTitle: moduleData?.title,
      completedQuestions,
      finalAccuracy,
      totalTime,
      completedAt: new Date()?.toISOString(),
      passed: finalAccuracy >= 70,
    };

    localStorage.setItem(
      `quiz_results_${moduleData?.id}`,
      JSON.stringify(quizResults)
    );

    // Navigate to results or roadmap
    navigate("/ai-generated-roadmap", {
      state: {
        quizCompleted: true,
        results: quizResults,
      },
    });
  };

  // Handle exit quiz
  const handleExitQuiz = () => {
    if (completedQuestions?.length > 0) {
      const confirmExit = window.confirm(
        "Are you sure you want to exit? Your progress will be saved."
      );
      if (!confirmExit) return;
    }

    saveProgress();
    navigate("/ai-generated-roadmap");
  };

  // Handle question jump (for completed questions)
  const handleQuestionJump = (questionIndex) => {
    if (questionIndex < currentQuestionIndex) {
      setCurrentQuestionIndex(questionIndex);
      setSelectedAnswer(
        completedQuestions?.[questionIndex]?.selectedAnswer || null
      );
      setIsSubmitted(true);
      setShowHint(false);
    }
  };

  const currentQuestion = questions?.[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions?.length - 1;
  const accuracy = calculateAccuracy();

  // Learning context for breadcrumb
  const learningContext = {
    technology: "JavaScript",
    goal: "Full Stack Development",
    module: {
      name: moduleData?.title,
      id: moduleData?.id,
      totalQuestions: questions?.length,
    },
    currentQuestion: {
      number: currentQuestionIndex + 1,
      topic: currentQuestion?.topic,
    },
    difficulty: currentQuestion?.difficulty,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressNavigationBar
        isVisible={true}
        currentModule={{
          title: moduleData?.title,
          questionProgress: {
            current: currentQuestionIndex + 1,
            total: questions?.length,
          },
        }}
        overallProgress={(currentQuestionIndex / questions?.length) * 100}
        totalModules={1}
      />
      <main className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Learning Context Breadcrumb */}
          <LearningContextBreadcrumb
            context={learningContext}
            className="mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Quiz Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quiz Header */}
              <QuizHeader
                moduleTitle={moduleData?.title}
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={questions?.length}
                timeElapsed={timeElapsed}
                onExitQuiz={handleExitQuiz}
              />

              {/* Question Card */}
              <QuestionCard
                question={currentQuestion}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={selectedAnswer}
                showFeedback={showFeedback}
                isSubmitted={isSubmitted}
              />

              {/* Quiz Controls */}
              <QuizControls
                selectedAnswer={selectedAnswer}
                isSubmitted={isSubmitted}
                isLastQuestion={isLastQuestion}
                isLoading={isLoading}
                onSubmitAnswer={handleSubmitAnswer}
                onNextQuestion={handleNextQuestion}
                onFinishQuiz={handleFinishQuiz}
                showHint={showHint}
                onToggleHint={() => setShowHint(!showHint)}
              />

              {/* Hint Section */}
              {showHint && currentQuestion && (
                <div className="glass-card border border-purple-500/20 rounded-lg p-4 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Lightbulb" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">
                      Hint
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Think about the most commonly used methods for DOM
                    manipulation. Consider both traditional and modern
                    approaches.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <QuizSidebar
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  completedQuestions={completedQuestions}
                  accuracy={accuracy}
                  timeElapsed={timeElapsed}
                  isCollapsed={sidebarCollapsed}
                  onToggleCollapse={() =>
                    setSidebarCollapsed(!sidebarCollapsed)
                  }
                  onQuestionJump={handleQuestionJump}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Adaptive Feedback Modal */}
      <AdaptiveFeedback
        isVisible={showFeedback}
        isCorrect={feedbackData?.isCorrect}
        streakCount={feedbackData?.streakCount}
        difficultyChange={feedbackData?.difficultyChange}
        accuracy={feedbackData?.accuracy}
        onClose={() => setShowFeedback(false)}
        autoCloseDelay={3000}
      />
      {/* Mobile Quiz Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 glass-card border-t border-purple-500/20">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            iconName="BarChart3"
            iconPosition="left"
            iconSize={16}
            className="hover:bg-white/5"
          >
            Progress
          </Button>

          <div className="text-center">
            <div className="text-sm font-medium text-foreground">
              {currentQuestionIndex + 1} / {questions?.length}
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.round(accuracy)}% accuracy
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExitQuiz}
            iconName="X"
            className="hover:bg-white/5 text-muted-foreground hover:text-error"
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModuleQuizInterface;
