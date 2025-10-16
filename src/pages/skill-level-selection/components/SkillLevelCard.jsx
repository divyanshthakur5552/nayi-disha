import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const SkillLevelCard = ({ level, isSelected, onSelect, className = "" }) => {
  const levelConfig = {
    basic: {
      icon: "Seedling",
      title: "Basic",
      subtitle: "Just Getting Started",
      description:
        "Perfect for beginners with little to no programming experience",
      prerequisites: [
        "Basic computer literacy",
        "Familiarity with web browsers",
        "Understanding of files and folders",
      ],
      concepts: [
        "HTML structure and tags",
        "CSS styling basics",
        "JavaScript variables and functions",
        "Basic problem-solving skills",
      ],
      outcomes: [
        "Build simple web pages",
        "Understand fundamental concepts",
        "Write basic JavaScript code",
        "Style elements with CSS",
      ],
      estimatedTime: "2-3 months",
      color: "success",
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-400",
    },
    intermediate: {
      icon: "TreePine",
      title: "Intermediate",
      subtitle: "Building Confidence",
      description:
        "For learners with some programming background and basic web development knowledge",
      prerequisites: [
        "HTML/CSS fundamentals",
        "Basic JavaScript knowledge",
        "Understanding of DOM manipulation",
        "Familiarity with developer tools",
      ],
      concepts: [
        "ES6+ JavaScript features",
        "Responsive design principles",
        "API integration basics",
        "Version control with Git",
      ],
      outcomes: [
        "Create interactive web applications",
        "Work with modern JavaScript frameworks",
        "Implement responsive designs",
        "Handle asynchronous operations",
      ],
      estimatedTime: "3-4 months",
      color: "warning",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-400",
    },
    advanced: {
      icon: "Mountain",
      title: "Advanced",
      subtitle: "Ready for Challenges",
      description:
        "For experienced developers looking to master complex concepts and best practices",
      prerequisites: [
        "Solid JavaScript/TypeScript skills",
        "Experience with frameworks (React, Vue, etc.)",
        "Understanding of backend concepts",
        "Knowledge of testing and deployment",
      ],
      concepts: [
        "Advanced design patterns",
        "Performance optimization",
        "Microservices architecture",
        "DevOps and CI/CD pipelines",
      ],
      outcomes: [
        "Architect scalable applications",
        "Optimize performance and security",
        "Lead development teams",
        "Make strategic technical decisions",
      ],
      estimatedTime: "4-6 months",
      color: "error",
      gradient: "from-red-500/20 to-pink-500/20",
      borderColor: "border-red-500/30",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-400",
    },
  };

  const config = levelConfig?.[level];

  return (
    <div
      className={`
        relative glass-card transition-all duration-300 cursor-pointer group
        ${
          isSelected
            ? `border-2 ${config?.borderColor} neon-glow bg-gradient-to-br ${config?.gradient}`
            : "border border-purple-500/20 hover:border-purple-500/40"
        }
        hover:shadow-glass-lg animate-fade-in
        ${className}
      `}
      onClick={onSelect}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center neon-glow animate-spring">
          <Icon name="Check" size={14} className="text-white" />
        </div>
      )}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div
            className={`w-12 h-12 rounded-lg ${config?.iconBg} flex items-center justify-center`}
          >
            <Icon name={config?.icon} size={24} className={config?.iconColor} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground">
              {config?.title}
            </h3>
            <p className="text-sm text-muted-foreground">{config?.subtitle}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {config?.description}
        </p>

        {/* Prerequisites */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2 text-primary" />
            Prerequisites
          </h4>
          <ul className="space-y-2">
            {config?.prerequisites?.map((prereq, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-xs text-muted-foreground"
              >
                <Icon
                  name="Dot"
                  size={12}
                  className="mt-1 text-primary flex-shrink-0"
                />
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Concepts */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Lightbulb" size={16} className="mr-2 text-secondary" />
            Key Concepts
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {config?.concepts?.map((concept, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0"></div>
                <span className="text-xs text-muted-foreground">{concept}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
            <Icon name="Target" size={16} className="mr-2 text-accent" />
            You'll Be Able To
          </h4>
          <ul className="space-y-2">
            {config?.outcomes?.map((outcome, index) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-xs text-muted-foreground"
              >
                <Icon
                  name="ArrowRight"
                  size={12}
                  className="mt-1 text-accent flex-shrink-0"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center justify-between pt-4 border-t border-purple-500/20">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated Duration
            </span>
          </div>
          <span className="text-sm font-medium text-primary">
            {config?.estimatedTime}
          </span>
        </div>

        {/* Selection Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={`
            w-full mt-4 transition-all duration-200
            ${isSelected ? "neon-glow" : "hover:bg-white/5"}
          `}
          iconName={isSelected ? "Check" : "ArrowRight"}
          iconPosition="right"
          iconSize={16}
        >
          {isSelected ? "Selected" : `Choose ${config?.title}`}
        </Button>
      </div>
    </div>
  );
};

export default SkillLevelCard;
