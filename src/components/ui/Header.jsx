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
      <div className="flex flex-col">
        <span className="text-xl font-bold text-foreground">Nayi Disha</span>
        <span className="text-xs text-muted-foreground">
          AI-Powered Learning
        </span>
      </div>
    </div>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b ${className}`}
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
                  ${
                    isActive(item?.path)
                      ? "bg-primary text-primary-foreground"
                      : ""
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
              >
                More
              </Button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border rounded-lg shadow-md">
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
                        className="w-full justify-start text-sm"
                      >
                        {item?.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <Icon name="User" size={16} className="text-white" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            iconName={isMenuOpen ? "X" : "Menu"}
            className="lg:hidden"
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t">
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
                        ? "bg-primary text-primary-foreground"
                        : ""
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

              <div className="pt-2 mt-4 border-t">
                {secondaryItems?.map((item) => (
                  <Button
                    key={item?.path}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation(item?.path)}
                    iconName={item?.icon}
                    iconPosition="left"
                    iconSize={16}
                    className="w-full justify-start"
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
