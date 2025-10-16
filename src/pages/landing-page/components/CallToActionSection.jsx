import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CallToActionSection = ({ onStartLearning }) => {
  const steps = [
    {
      id: 1,
      title: "Choose Your Path",
      description: "Select your preferred technology and learning goals",
      icon: "Target",
      duration: "30 seconds",
    },
    {
      id: 2,
      title: "AI Assessment",
      description: "Quick skill evaluation to personalize your journey",
      icon: "Brain",
      duration: "2 minutes",
    },
    {
      id: 3,
      title: "Start Learning",
      description: "Begin with your custom AI-generated roadmap",
      icon: "Rocket",
      duration: "Immediate",
    },
  ];

  const benefits = [
    "Personalized AI-generated learning roadmap",
    "Adaptive quizzes that match your skill level",
    "Real-time progress tracking and analytics",
    "Career readiness scoring and recommendations",
    "Self-paced learning with flexible scheduling",
    "Comprehensive module completion reports",
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main CTA */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to Transform Your{" "}
            <span className="text-gradient">Coding Skills</span>?
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the future of personalized learning. Get started with your
            AI-powered development journey in less than 2 minutes.
          </p>

          {/* Primary CTA */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
              size="xl"
              onClick={onStartLearning}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={24}
              className="px-12 py-6 text-xl floating-action neon-glow mb-4"
            >
              Start Learning for Free
            </Button>
          </motion.div>

          <p className="text-sm text-muted-foreground">
            No credit card required • Get started immediately • Cancel anytime
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            Get Started in 3 Simple Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps?.map((step, index) => (
              <motion.div
                key={step?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-card border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-all duration-300">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-sm neon-glow">
                      {step?.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Icon
                      name={step?.icon}
                      size={28}
                      className="text-primary"
                    />
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {step?.title}
                  </h4>
                  <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                    {step?.description}
                  </p>
                  <div className="inline-flex items-center space-x-1 text-xs text-primary">
                    <Icon name="Clock" size={12} />
                    <span>{step?.duration}</span>
                  </div>
                </div>

                {/* Connector */}
                {index < steps?.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <Icon
                      name="ArrowRight"
                      size={20}
                      className="text-muted-foreground"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6">
              What You'll Get:
            </h3>
            <div className="space-y-3">
              {benefits?.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={12} className="text-success" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="glass-card border border-purple-500/20 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center">
                <Icon name="Zap" size={28} className="text-success" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                100% Free to Start
              </h4>
              <p className="text-muted-foreground text-sm mb-4">
                Experience the full power of AI-driven learning with no upfront
                costs or commitments.
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Shield" size={12} className="text-success" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} className="text-primary" />
                  <span>Trusted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={12} className="text-warning" />
                  <span>Fast Setup</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-6">
            Don't let another day pass without advancing your skills.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={onStartLearning}
              iconName="Play"
              iconPosition="left"
              iconSize={20}
              className="px-8 py-4 text-lg border-primary/50 hover:bg-primary/10"
            >
              Begin Your Journey Now
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
