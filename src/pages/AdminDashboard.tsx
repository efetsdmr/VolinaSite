import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { LogOut, Users, Moon, Sun, Globe } from 'lucide-react';
import { useDarkMode } from '../components/DarkModeContext';
import { useLanguage } from '../components/LanguageContext';
import volinaLogo from '../assets/volina-logo.svg';

interface DemoRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  employees: string;
  message: string;
  date: string;
}

export function AdminDashboard() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { language, setLanguage, t } = useLanguage();
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);

  // Mock data - Replace with actual API call
  useEffect(() => {
    const mockData: DemoRequest[] = [
      {
        id: 1,
        name: 'Ahmet Yılmaz',
        email: 'ahmet@formlab.com.tr',
        phone: '+90 532 123 4567',
        company: 'FormLab',
        sector: 'Nutrition and Consulting',
        employees: '10-50',
        message: 'We need an AI voice solution for customer support',
        date: '2024-12-01 14:30'
      },
      {
        id: 2,
        name: 'Ayşe Demir',
        email: 'ayse@lancora.com.tr',
        phone: '+90 533 987 6543',
        company: 'L\'Ancora Restaurant',
        sector: 'Restaurant',
        employees: '1-10',
        message: 'Looking for reservation automation',
        date: '2024-12-01 10:15'
      },
      {
        id: 3,
        name: 'Mehmet Kaya',
        email: 'mehmet@smileholiday.com.tr',
        phone: '+90 534 456 7890',
        company: 'Smile and Holiday Dental',
        sector: 'Dental',
        employees: '10-50',
        message: 'Patient appointment scheduling automation needed',
        date: '2024-11-30 16:45'
      }
    ];
    setDemoRequests(mockData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={volinaLogo} alt="Volina AI Logo" className="w-8 h-8" />
              <span className="text-xl text-[#333333] dark:text-white">
                Volina AI
              </span>
              <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400 ml-2">
                / {t.adminDashboard.title}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'TR'}</span>
              </Button>

              {/* Dark Mode Toggle */}
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="sm"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{t.adminDashboard.logout}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
              <Users className="w-8 h-8 text-[#3366FF]" />
            </div>
            <div>
              <h2 className="text-3xl text-[#333333] dark:text-white">
                {demoRequests.length}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {t.adminDashboard.totalRequests}
              </p>
            </div>
          </div>
        </div>

        {/* Demo Requests Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl text-[#333333] dark:text-white">
              {t.adminDashboard.demoRequests}
            </h3>
          </div>

          <div className="overflow-x-auto">
            {demoRequests.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {t.adminDashboard.noRequests}
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[1200px]">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">
                      {t.adminDashboard.name}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[220px]">
                      {t.adminDashboard.email}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]">
                      {t.adminDashboard.phone}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">
                      {t.adminDashboard.company}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">
                      {t.adminDashboard.sector}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[120px]">
                      {t.adminDashboard.employees}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[300px]">
                      {t.adminDashboard.message}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]">
                      {t.adminDashboard.date}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {demoRequests.map((request) => (
                    <tr 
                      key={request.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                    >
                      <td className="px-6 py-5 text-sm text-gray-900 dark:text-gray-100">
                        {request.name}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.email}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.phone}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.company}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.sector}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.employees}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        <div className="max-w-sm">
                          {request.message}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}