import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const SocialProofSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Frontend Developer at TechCorp",
      avatar: "https://images.unsplash.com/photo-1597621969117-1a305d3e0c68",
      avatarAlt:
        "Professional headshot of Asian woman with shoulder-length black hair wearing white blazer",
      content: `AdaptiveLearn's AI-powered roadmap helped me transition from design to development in just 3 months. The adaptive quizzes kept me challenged without being overwhelming.`,
      rating: 5,
      technology: "React",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Full Stack Engineer at StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1596717951382-a3cbbdd4b8fd",
      avatarAlt:
        "Professional headshot of Hispanic man with short dark hair wearing navy blue shirt",
      content: `The personalized learning path was exactly what I needed. Instead of generic tutorials, I got content tailored to my goals and current skill level.`,
      rating: 5,
      technology: "Node.js",
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Software Developer at InnovateLab",
      avatar: "https://images.unsplash.com/photo-1608107558140-1ea5ccf01637",
      avatarAlt:
        "Professional headshot of Caucasian woman with blonde hair in ponytail wearing gray sweater",
      content: `The progress tracking and analytics helped me identify my weak areas and focus my learning efforts. I landed my dream job within 6 months!`,
      rating: 5,
      technology: "JavaScript",
    },
  ];

  const stats = [
    {
      id: 1,
      value: "95%",
      label: "Completion Rate",
      description: "Students complete their learning roadmaps",
      icon: "TrendingUp",
      color: "text-success",
    },
    {
      id: 2,
      value: "3x",
      label: "Faster Learning",
      description: "Compared to traditional methods",
      icon: "Zap",
      color: "text-primary",
    },
    {
      id: 3,
      value: "89%",
      label: "Career Success",
      description: "Land jobs within 6 months",
      icon: "Award",
      color: "text-warning",
    },
    {
      id: 4,
      value: "4.9/5",
      label: "User Rating",
      description: "Average satisfaction score",
      icon: "Star",
      color: "text-secondary",
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

  const itemVariants = {
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
    <section className="py-20 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
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
            Trusted by{" "}
            <span className="text-gradient">Developers Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who have accelerated their careers with
            our AI-powered learning platform.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats?.map((stat) => (
            <motion.div
              key={stat?.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="glass-card border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`}
              >
                <Icon name={stat?.icon} size={24} className={stat?.color} />
              </div>
              <div
                className={`text-2xl md:text-3xl font-bold ${stat?.color} mb-2`}
              >
                {stat?.value}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {stat?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials?.map((testimonial) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-card border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial?.rating)]?.map((_, index) => (
                  <Icon
                    key={index}
                    name="Star"
                    size={16}
                    className="text-warning fill-current"
                  />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial?.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src={testimonial?.avatar}
                    alt={testimonial?.avatarAlt}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background flex items-center justify-center">
                    <Icon name="Check" size={8} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial?.role}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-xs text-primary font-medium">
                      {testimonial?.technology}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} className="text-primary" />
            <span>10,000+ Active Learners</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} className="text-secondary" />
            <span>Available Worldwide</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} className="text-warning" />
            <span>24/7 Learning Access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;
