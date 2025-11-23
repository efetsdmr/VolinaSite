import React, { useState } from 'react';
import { Phone, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { DemoModal } from './DemoModal';
import volinaLogo from 'figma:asset/49959c7d4e27a10999ba3ed912e7a8ffb01555d2.png';

export function Footer() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const footerLinks = {
    Product: ['Features', 'Pricing', 'Case Studies', 'Integrations', 'API Docs'],
    Company: ['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact'],
    Resources: ['Help Center', 'Community', 'Webinars', 'Status', 'Partners'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR']
  };

  return (
    <footer className="bg-[#333333] dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* CTA Section */}
        <div className="py-12 sm:py-16 border-b border-gray-700 dark:border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 px-4">
              Ready to Transform Your Call Process?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 dark:text-gray-400 mb-6 sm:mb-8 px-4">
              Join 2,000+ businesses automating their calls with AI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white rounded-xl hover:opacity-90 transition-opacity text-base sm:text-lg"
              >
                Book a Demo Call
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#333333] rounded-xl hover:bg-gray-100 transition-colors text-base sm:text-lg">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src={volinaLogo} alt="Volina AI Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl">Volina AI</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 mb-4 sm:mb-6 max-w-xs">
              Automate your calls with human-like AI voice agents. Never miss a lead again.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm sm:text-base text-white mb-3 sm:mb-4">{category}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 sm:py-8 border-t border-gray-700 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            © 2025 Volina AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Cookies</a>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </footer>
  );
}