import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const TechnologyShowcase = () => {
  const technologies = [
    {
      id: 1,
      name: "JavaScript",
      description:
        "Master modern JavaScript ES6+ features, async programming, and DOM manipulation",
      icon: "Code2",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/20",
      borderColor: "border-yellow-400/30",
      features: ["ES6+ Syntax", "Async/Await", "DOM APIs", "Event Handling"],
    },
    {
      id: 2,
      name: "React",
      description:
        "Build dynamic user interfaces with hooks, state management, and component architecture",
      icon: "Atom",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/20",
      borderColor: "border-cyan-400/30",
      features: [
        "Hooks & State",
        "Component Design",
        "Context API",
        "Performance",
      ],
    },
    {
      id: 3,
      name: "Node.js",
      description:
        "Develop scalable backend applications with Express, APIs, and database integration",
      icon: "Server",
      color: "text-green-400",
      bgColor: "bg-green-400/20",
      borderColor: "border-green-400/30",
      features: ["Express.js", "REST APIs", "Database ORM", "Authentication"],
    },
    {
      id: 4,
      name: "Python",
      description:
        "Learn web development with Django/Flask, data structures, and algorithm optimization",
      icon: "FileCode",
      color: "text-blue-400",
      bgColor: "bg-blue-400/20",
      borderColor: "border-blue-400/30",
      features: [
        "Django/Flask",
        "Data Structures",
        "Algorithms",
        "Web Scraping",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Master In-Demand <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from popular web development technologies and get
            personalized learning paths designed by AI to match your career
            goals.
          </p>
        </motion.div>

        {/* Technology Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies?.map((tech, index) => (
            <motion.div
              key={tech?.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group cursor-pointer"
            >
              <div
                className={`glass-card border ${tech?.borderColor} rounded-xl p-8 h-full hover:border-opacity-60 transition-all duration-300`}
              >
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${tech?.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon name={tech?.icon} size={24} className={tech?.color} />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-bold ${tech?.color} group-hover:text-opacity-80 transition-colors`}
                    >
                      {tech?.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div
                        className={`w-2 h-2 ${tech?.bgColor} rounded-full animate-pulse`}
                      ></div>
                      <span className="text-xs text-muted-foreground">
                        Available Now
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {tech?.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-semibold text-foreground">
                    Key Learning Areas:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {tech?.features?.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={`w-1.5 h-1.5 ${tech?.bgColor} rounded-full`}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="BookOpen" size={14} />
                    <span>8-12 Modules</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>Self-paced</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tech?.bgColor} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-2">4</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">
              Learning Modules
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-2">
              AI-Powered
            </div>
            <div className="text-sm text-muted-foreground">Personalization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-2">
              Real-time
            </div>
            <div className="text-sm text-muted-foreground">Adaptation</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
