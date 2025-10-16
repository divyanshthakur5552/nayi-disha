import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const TechnologyCard = ({
  technology,
  isSelected = false,
  onSelect = () => {},
  className = "",
}) => {
  const getTechnologyIcon = (tech) => {
    const iconMap = {
      Python: "Code2",
      JavaScript: "Zap",
      React: "Atom",
      "Node.js": "Server",
    };
    return iconMap?.[tech] || "Code";
  };

  const getTechnologyColor = (tech) => {
    const colorMap = {
      Python: "from-blue-500 to-green-500",
      JavaScript: "from-yellow-400 to-orange-500",
      React: "from-cyan-400 to-blue-500",
      "Node.js": "from-green-400 to-emerald-500",
    };
    return colorMap?.[tech] || "from-primary to-secondary";
  };

  return (
    <div
      className={`
        relative glass-card border transition-all duration-300 cursor-pointer group
        ${
          isSelected
            ? "border-primary/60 neon-glow bg-primary/5"
            : "border-purple-500/20 hover:border-purple-500/40 hover:shadow-glass-lg"
        }
        ${className}
      `}
      onClick={() => onSelect(technology)}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-spring">
          <Icon name="Check" size={14} className="text-primary-foreground" />
        </div>
      )}
      <div className="p-6">
        {/* Technology Icon */}
        <div className="mb-4">
          <div
            className={`
              w-16 h-16 rounded-xl bg-gradient-to-br ${getTechnologyColor(
                technology?.name
              )} 
              flex items-center justify-center mb-3 mx-auto
              ${isSelected ? "neon-glow" : "group-hover:scale-110"}
              transition-transform duration-300
            `}
          >
            <Icon
              name={getTechnologyIcon(technology?.name)}
              size={32}
              className="text-white"
            />
          </div>
        </div>

        {/* Technology Name */}
        <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
          {technology?.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground text-center mb-4 line-clamp-3">
          {technology?.description}
        </p>

        {/* Use Cases */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-foreground mb-2">
            Popular for:
          </h4>
          <div className="flex flex-wrap gap-1">
            {technology?.useCases?.slice(0, 3)?.map((useCase, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted/20 text-muted-foreground text-xs rounded-md"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-6">
          <h4 className="text-xs font-medium text-foreground mb-2">
            You'll learn:
          </h4>
          <ul className="space-y-1">
            {technology?.learningOutcomes
              ?.slice(0, 3)
              ?.map((outcome, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-xs text-muted-foreground"
                >
                  <Icon
                    name="ArrowRight"
                    size={12}
                    className="mt-0.5 flex-shrink-0"
                  />
                  <span>{outcome}</span>
                </li>
              ))}
          </ul>
        </div>

        {/* Selection Button */}
        <Button
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className={`
            w-full transition-all duration-300
            ${isSelected ? "neon-glow" : "hover:border-primary/50"}
          `}
          iconName={isSelected ? "Check" : "Plus"}
          iconPosition="left"
          iconSize={16}
        >
          {isSelected ? "Selected" : "Select Technology"}
        </Button>
      </div>
    </div>
  );
};

export default TechnologyCard;
