import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Phone, TrendingUp, Target, Menu, Moon, Sun, Globe, User } from 'lucide-react';
import { useDarkMode } from './DarkModeContext';
import { useLanguage } from './LanguageContext';
import { DemoModal } from './DemoModal';
import { TryVolinaModal } from './TryVolinaModal';
import volinaLogo from '../assets/volina-logo.svg';

export function Hero() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isTryVolinaModalOpen, setIsTryVolinaModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/5 via-transparent to-purple-950/5 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-3 -ml-2 sm:-ml-4">
            <img src={volinaLogo} alt="Volina AI Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-xl sm:text-2xl text-[#333333] dark:text-white">Volina AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#solutions" className="text-[#333333] dark:text-gray-300 hover:text-[#3366FF] dark:hover:text-[#3366FF] transition-colors">{t.nav.solutions}</a>
            <a href="#how-it-works" className="text-[#333333] dark:text-gray-300 hover:text-[#3366FF] dark:hover:text-[#3366FF] transition-colors">{t.nav.howItWorks}</a>
            <a href="#case-studies" className="text-[#333333] dark:text-gray-300 hover:text-[#3366FF] dark:hover:text-[#3366FF] transition-colors">{t.nav.caseStudies}</a>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="rounded-full flex items-center gap-1.5"
              title={language === 'en' ? 'Türkçe' : 'English'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'en' ? 'TR' : 'EN'}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/login')}
              className="rounded-full"
              title="Admin Panel"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="rounded-full flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="text-xs">{language === 'en' ? 'TR' : 'EN'}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/login')}
              className="rounded-full"
            >
              <User className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="py-12 sm:py-16 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 mb-6 sm:mb-8">
              <div className="w-2 h-2 rounded-full bg-[#8C51FF] animate-pulse"></div>
              <span className="text-xs sm:text-sm text-[#8C51FF] dark:text-purple-400">{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#333333] dark:text-white mb-4 sm:mb-6 tracking-tight px-4">
              {t.hero.title}
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4">
              <Button 
                size="lg" 
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto bg-[#3366FF] hover:bg-[#3366FF]/90 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg"
              >
                {t.hero.bookDemo}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setIsTryVolinaModalOpen(true)}
                className="w-full sm:w-auto border-2 border-[#333333] dark:border-gray-600 text-[#333333] dark:text-gray-300 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg hover:bg-[#333333] hover:text-white dark:hover:bg-gray-700"
              >
                {t.hero.tryVolina}
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#3366FF]" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl text-[#333333] dark:text-white mb-1 sm:mb-2">{t.hero.metric1Title}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t.hero.metric1Desc}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#8C51FF]" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl text-[#333333] dark:text-white mb-1 sm:mb-2">{t.hero.metric2Title}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t.hero.metric2Desc}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#3366FF]" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl text-[#333333] dark:text-white mb-1 sm:mb-2">{t.hero.metric3Title}</div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{t.hero.metric3Desc}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      {/* Try Volina Modal */}
      <TryVolinaModal isOpen={isTryVolinaModalOpen} onClose={() => setIsTryVolinaModalOpen(false)} />
    </section>
  );
}