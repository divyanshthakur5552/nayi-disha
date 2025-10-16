import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/ai-generated-roadmap",
      icon: "LayoutDashboard",
      description: "View your learning roadmap",
    },
    {
      label: "Quiz",
      path: "/module-quiz-interface",
      icon: "Brain",
      description: "Take adaptive quizzes",
    },
    {
      label: "Progress",
      path: "/progress",
      icon: "TrendingUp",
      description: "Track your learning progress",
    },
    {
      label: "Goals",
      path: "/goal-selection",
      icon: "Target",
      description: "Manage learning goals",
    },
  ];

  const secondaryItems = [
    { label: "Settings", path: "/settings", icon: "Settings" },
    { label: "Help", path: "/help", icon: "HelpCircle" },
    { label: "Profile", path: "/profile", icon: "User" },
  ];

  const isActive = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
          <Icon name="Zap" size={24} className="text-white" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gradient">AdaptiveLearn</span>
        <span className="text-xs text-muted-foreground">
          AI-Powered Learning
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 glass-card border-b border-purple-500/20 ${className}`}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleNavigation("/ai-generated-roadmap")}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={isActive(item?.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={18}
                className={`
                  px-4 py-2 transition-all duration-200
                  ${
                    isActive(item?.path)
                      ? "bg-primary/20 text-primary border border-primary/30 neon-glow"
                      : "hover:bg-white/5 hover:text-primary"
                  }
                `}
              >
                {item?.label}
              </Button>
            ))}
          </nav>

          {/* Desktop Secondary Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                iconName="MoreHorizontal"
                className="hover:bg-white/5"
              >
                More
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-purple-500/20 rounded-lg shadow-glass-lg animate-fade-in">
                  <div className="p-2">
                    {secondaryItems?.map((item) => (
                      <Button
                        key={item?.path}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNavigation(item?.path)}
                        iconName={item?.icon}
                        iconPosition="left"
                        iconSize={16}
                        className="w-full justify-start hover:bg-white/5 text-sm"
                      >
                        {item?.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Icon name="User" size={16} className="text-white" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName={isMenuOpen ? "X" : "Menu"}
            className="lg:hidden hover:bg-white/5"
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-purple-500/20 animate-slide-up">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Button
                  key={item?.path}
                  variant={isActive(item?.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item?.path)}
                  iconName={item?.icon}
                  iconPosition="left"
                  iconSize={18}
                  className={`
                    w-full justify-start px-4 py-3
                    ${
                      isActive(item?.path)
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "hover:bg-white/5"
                    }
                  `}
                >
                  <div className="flex flex-col items-start">
                    <span>{item?.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item?.description}
                    </span>
                  </div>
                </Button>
              ))}

              <div className="pt-2 mt-4 border-t border-purple-500/20">
                {secondaryItems?.map((item) => (
                  <Button
                    key={item?.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    iconName={item?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start hover:bg-white/5"
                  >
                    {item?.label}
                  </Button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
