import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import FeatureCards from "./components/FeatureCards";
import TechnologyShowcase from "./components/TechnologyShowcase";
import SocialProofSection from "./components/SocialProofSection";
import CallToActionSection from "./components/CallToActionSection";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate("/subject-selection");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <HeroSection onStartLearning={handleStartLearning} />
      {/* Feature Cards Section */}
      <FeatureCards />
      {/* Technology Showcase */}
      <TechnologyShowcase />
      {/* Social Proof Section */}
      <SocialProofSection />
      {/* Call to Action Section */}
      <CallToActionSection onStartLearning={handleStartLearning} />
      {/* Footer */}
      <motion.footer
        className="border-t border-purple-500/20 py-12 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold">AL</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gradient">
                    AdaptiveLearn
                  </div>
                  <div className="text-xs text-muted-foreground">
                    AI-Powered Learning Platform
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Revolutionizing web development education through personalized
                AI-driven learning experiences. Master coding skills faster with
                adaptive technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Technologies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} AdaptiveLearn. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-xs text-muted-foreground">
                Made with ❤️ for developers
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
