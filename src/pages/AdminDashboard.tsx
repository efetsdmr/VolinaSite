import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { LogOut, Users, Moon, Sun, Globe, Info, X } from 'lucide-react';
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
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch demo requests from API
  useEffect(() => {
    const fetchDemoRequests = async () => {
      const token = localStorage.getItem('adminToken');
      
      console.log('Dashboard mounted, checking token:', token ? 'Token found' : 'No token');
      
      // If no token, redirect to login
      if (!token) {
        console.log('No token found, redirecting to login...');
        window.location.href = '/admin';
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        
        console.log('Fetching messages with token...');
        
        const response = await fetch(
          'https://ahudio-site-backend.onrender.com/messages/?page_number=1&page_size=100',
          {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log('API Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('API Response:', data);
          
          // Transform API data to match our interface
          // API might return data in different formats, adjust accordingly
          const messages = Array.isArray(data) ? data : data.messages || data.items || [];
          
          console.log('Messages found:', messages.length);
          
          const transformedData: DemoRequest[] = messages.map((item: any, index: number) => {
            // Parse date and add 3 hours for Turkey timezone (UTC+3)
            let formattedDate = 'N/A';
            if (item.created_at) {
              const date = new Date(item.created_at);
              date.setHours(date.getHours() + 3); // Add 3 hours
              formattedDate = date.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US');
            } else if (item.date) {
              formattedDate = item.date;
            }

            return {
              id: item.id || index + 1,
              name: item.name || item.full_name || 'N/A',
              email: item.email || 'N/A',
              phone: item.phone || item.phone_number || 'N/A',
              company: item.company || item.company_name || 'N/A',
              sector: item.business_type || item.sector || item.industry || 'N/A',
              employees: item.employees || item.employee_count || 'N/A',
              message: item.message || item.content || item.description || 'N/A',
              date: formattedDate
            };
          });
          
          setDemoRequests(transformedData);
        } else if (response.status === 401) {
          // Unauthorized - token expired or invalid
          console.error('Unauthorized: Token expired or invalid');
          localStorage.removeItem('adminToken');
          alert('Session expired. Please login again.');
          window.location.href = '/admin';
        } else {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          setError(`Failed to load demo requests (${response.status})`);
        }
      } catch (err) {
        console.error('Error fetching demo requests:', err);
        setError('Connection error. Please check your internet connection.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDemoRequests();
  }, [language]);

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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            {isLoading ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {t.adminDashboard.loading}
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {error}
                </p>
              </div>
            ) : demoRequests.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  {t.adminDashboard.noRequests}
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">
                      {t.adminDashboard.name}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[250px]">
                      {t.adminDashboard.email}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[200px]">
                      {t.adminDashboard.company}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[180px]">
                      {t.adminDashboard.sector}
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider min-w-[160px]">
                      {t.adminDashboard.date}
                    </th>
                    <th className="px-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider w-[100px]">
                      {t.adminDashboard.actions}
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
                        {request.company}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.sector}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600 dark:text-gray-400">
                        {request.date}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <Button
                          onClick={() => setSelectedRequest(request)}
                          variant="ghost"
                          size="sm"
                          className="text-[#3366FF] hover:text-[#3366FF]/80 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl text-[#333333] dark:text-white">
                {t.adminDashboard.requestDetails}
              </h3>
              <Button
                onClick={() => setSelectedRequest(null)}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.name}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {selectedRequest.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.email}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  <a 
                    href={`mailto:${selectedRequest.email}`}
                    className="text-[#3366FF] hover:underline"
                  >
                    {selectedRequest.email}
                  </a>
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.phone}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  <a 
                    href={`tel:${selectedRequest.phone}`}
                    className="text-[#3366FF] hover:underline"
                  >
                    {selectedRequest.phone}
                  </a>
                </p>
              </div>

              {/* Company */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.company}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {selectedRequest.company}
                </p>
              </div>

              {/* Sector */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.sector}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {selectedRequest.sector}
                </p>
              </div>

              {/* Employees */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.employees}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {selectedRequest.employees}
                </p>
              </div>

              {/* Date */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.date}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {selectedRequest.date}
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.adminDashboard.message}
                </label>
                <p className="mt-1 text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
                  {selectedRequest.message}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={() => setSelectedRequest(null)}
                className="w-full bg-[#3366FF] hover:bg-[#3366FF]/90 text-white py-3 rounded-xl"
              >
                {t.adminDashboard.close}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}