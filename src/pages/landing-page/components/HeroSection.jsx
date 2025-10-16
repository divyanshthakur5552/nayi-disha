import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const HeroSection = ({ onStartLearning }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Logo/Brand */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow">
              <Icon name="Zap" size={32} className="text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold text-gradient">
                AdaptiveLearn
              </h1>
              <p className="text-sm text-muted-foreground">
                AI-Powered Learning Platform
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master Web Development with{" "}
            <span className="text-gradient">AI-Powered</span> Adaptive Learning
          </motion.h2>

          {/* Value Proposition */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience personalized learning journeys with AI-generated
            roadmaps, adaptive quizzes that adjust to your skill level, and
            comprehensive progress tracking. Transform your coding skills with
            intelligent, data-driven education.
          </motion.p>

          {/* Key Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                AI-Powered
              </div>
              <div className="text-sm text-muted-foreground">
                Personalized Roadmaps
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-secondary">
                Adaptive
              </div>
              <div className="text-sm text-muted-foreground">Quiz System</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                Real-time
              </div>
              <div className="text-sm text-muted-foreground">
                Progress Tracking
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="default"
              size="lg"
              onClick={onStartLearning}
              iconName="Rocket"
              iconPosition="right"
              iconSize={20}
              className="px-8 py-4 text-lg floating-action neon-glow hover:scale-105 transition-transform duration-200"
            >
              Start Your Learning Journey
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Secure Learning Environment</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span>Self-Paced Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-warning" />
              <span>Skill Certification Ready</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full opacity-40"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-3 h-3 bg-accent rounded-full opacity-50"
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </section>
  );
};

export default HeroSection;
