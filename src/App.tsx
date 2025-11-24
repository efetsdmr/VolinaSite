import React from 'react';
import { DarkModeProvider } from './components/DarkModeContext';
import { LanguageProvider } from './components/LanguageContext';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

// Suppress Jotai multiple instance warning - this is a known issue with Radix UI in bundled environments
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes?.('Detected multiple Jotai instances')) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

export default function App() {
  return (
    <LanguageProvider>
      <DarkModeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Hero />
          <ProblemSolution />
          <HowItWorks />
          <Features />
          <Testimonials />
          <Footer />
        </div>
      </DarkModeProvider>
    </LanguageProvider>
  );
}