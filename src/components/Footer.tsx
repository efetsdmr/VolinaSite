import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { DemoModal } from './DemoModal';
import volinaLogo from '../assets/volina-logo.svg';

export function Footer() {
  const { t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const footerLinks = {};

  return (
    <footer className="bg-[#333333] dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* CTA Section */}
        <div className="py-12 sm:py-16 border-b border-gray-700 dark:border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 px-4">
              {t.footer.ctaTitle}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 dark:text-gray-400 mb-6 sm:mb-8 px-4">
              {t.footer.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white rounded-xl hover:opacity-90 transition-opacity text-base sm:text-lg"
              >
                {t.footer.bookDemo}
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#333333] rounded-xl hover:bg-gray-100 transition-colors text-base sm:text-lg">
                {t.footer.startTrial}
              </button>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="py-12 sm:py-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src={volinaLogo} alt="Volina AI Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl">Volina AI</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 max-w-md">
              {t.footer.description}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 sm:py-8 border-t border-gray-700 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            <a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">{t.footer.cookies}</a>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </footer>
  );
}