import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Generated Roadmaps",
      description:
        "Personalized learning paths created by advanced AI algorithms tailored to your goals, skill level, and preferred technologies.",
      benefits: [
        "Customized curriculum",
        "Optimal learning sequence",
        "Goal-oriented modules",
      ],
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 2,
      icon: "Target",
      title: "Adaptive Quiz System",
      description:
        "Intelligent quizzes that adjust difficulty in real-time based on your performance using advanced rolling window algorithms.",
      benefits: [
        "Dynamic difficulty",
        "Performance tracking",
        "Instant feedback",
      ],
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      id: 3,
      icon: "TrendingUp",
      title: "Progress Analytics",
      description:
        "Comprehensive tracking and visualization of your learning journey with detailed insights and performance metrics.",
      benefits: [
        "Visual progress charts",
        "Skill mastery tracking",
        "Career readiness scoring",
      ],
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      icon: "Lightbulb",
      title: "Smart Recommendations",
      description:
        "AI-powered suggestions for resources, practice exercises, and next steps based on your learning patterns and goals.",
      benefits: [
        "Personalized resources",
        "Learning optimization",
        "Skill gap analysis",
      ],
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">AdaptiveLearn</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of personalized education with cutting-edge AI
            technology designed to accelerate your web development mastery.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="glass-card border border-purple-500/20 rounded-xl p-6 h-full hover:border-purple-500/40 transition-all duration-300">
                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center neon-glow group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon
                      name={feature?.icon}
                      size={28}
                      className="text-white"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full animate-pulse"></div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature?.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {feature?.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2">
                  {feature?.benefits?.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4">
            Ready to experience personalized learning?
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <Icon name="ArrowRight" size={16} />
            <span>Get started in less than 2 minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
