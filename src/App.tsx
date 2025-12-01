import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './components/DarkModeContext';
import { LanguageProvider } from './components/LanguageContext';
import { LandingPage } from './pages/LandingPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

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
    <Router>
      <LanguageProvider>
        <DarkModeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </DarkModeProvider>
      </LanguageProvider>
    </Router>
  );
}