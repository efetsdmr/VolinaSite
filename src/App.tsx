import React from 'react';
import { DarkModeProvider } from './components/DarkModeContext';
import { Hero } from './components/Hero';
import { ProblemSolution } from './components/ProblemSolution';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { AdminPanel } from './components/AdminPanel';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Features />
        <Testimonials />
        <AdminPanel />
        <Pricing />
        <Footer />
      </div>
    </DarkModeProvider>
  );
}