import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { LogOut, Users, Moon, Sun, Globe, Info, X, LayoutDashboard, MessageSquare, Settings, BarChart3, Menu, TrendingUp, TrendingDown, Phone, Clock, DollarSign } from 'lucide-react';
import { useDarkMode } from '../components/DarkModeContext';
import { useLanguage } from '../components/LanguageContext';
import volinaLogo from '../assets/volina-logo.svg';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DemoRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
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
  const [activeTab, setActiveTab] = useState('demo-requests');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('1month');

  // Mock data for dashboard metrics based on selected filters
  const getMetricsData = () => {
    // This would normally come from API based on selectedAssistant and selectedPeriod
    const metricsMap: Record<string, Record<string, any>> = {
      'all-1month': {
        calls: 145,
        callsChange: 100.0,
        avgDuration: '0:00',
        avgDurationChange: 0.0,
        totalCost: 10,
        totalCostChange: 100.0,
        avgCost: 0,
        avgCostChange: 0.0,
        callSuccess: 100,
        callSuccessChange: 100.0
      },
      'all-3months': {
        calls: 420,
        callsChange: 85.0,
        avgDuration: '2:15',
        avgDurationChange: 12.5,
        totalCost: 35,
        totalCostChange: 75.0,
        avgCost: 0.08,
        avgCostChange: 8.0,
        callSuccess: 97,
        callSuccessChange: 5.0
      },
      'all-6months': {
        calls: 890,
        callsChange: 65.0,
        avgDuration: '2:30',
        avgDurationChange: 18.0,
        totalCost: 78,
        totalCostChange: 60.0,
        avgCost: 0.09,
        avgCostChange: 5.5,
        callSuccess: 95,
        callSuccessChange: 8.0
      },
      'all-12months': {
        calls: 1850,
        callsChange: 45.0,
        avgDuration: '2:45',
        avgDurationChange: 22.0,
        totalCost: 165,
        totalCostChange: 50.0,
        avgCost: 0.09,
        avgCostChange: 4.0,
        callSuccess: 94,
        callSuccessChange: 12.0
      },
      'assistant-a-1month': {
        calls: 85,
        callsChange: 120.0,
        avgDuration: '1:45',
        avgDurationChange: 15.0,
        totalCost: 6,
        totalCostChange: 110.0,
        avgCost: 0.07,
        avgCostChange: 5.0,
        callSuccess: 98,
        callSuccessChange: 8.0
      },
      'assistant-b-1month': {
        calls: 60,
        callsChange: 80.0,
        avgDuration: '2:15',
        avgDurationChange: 10.0,
        totalCost: 4,
        totalCostChange: 90.0,
        avgCost: 0.07,
        avgCostChange: 3.0,
        callSuccess: 100,
        callSuccessChange: 15.0
      },
    };

    const key = `${selectedAssistant}-${selectedPeriod}`;
    return metricsMap[key] || metricsMap['all-1month'];
  };

  const dashboardData = getMetricsData();

  // Mock data for chart based on selected period
  const getChartData = () => {
    const chartDataMap: Record<string, any[]> = {
      '1month': [
        { date: 'Nov 4', value: 0 },
        { date: 'Nov 6', value: 0 },
        { date: 'Nov 8', value: 0 },
        { date: 'Nov 11', value: 0 },
        { date: 'Nov 13', value: 0 },
        { date: 'Nov 16', value: 0 },
        { date: 'Nov 19', value: 100 },
        { date: 'Nov 21', value: 0 },
        { date: 'Nov 23', value: 100 },
        { date: 'Nov 25', value: 100 },
        { date: 'Nov 27', value: 100 },
        { date: 'Nov 29', value: 100 },
        { date: 'Dec 1', value: 100 },
        { date: 'Dec 2', value: 100 },
        { date: 'Dec 3', value: 100 },
        { date: 'Dec 4', value: 100 },
      ],
      '3months': [
        { date: 'Sep', value: 45 },
        { date: 'Sep 15', value: 52 },
        { date: 'Oct', value: 68 },
        { date: 'Oct 15', value: 75 },
        { date: 'Nov', value: 88 },
        { date: 'Nov 15', value: 92 },
        { date: 'Dec', value: 97 },
      ],
      '6months': [
        { date: 'Jul', value: 35 },
        { date: 'Aug', value: 42 },
        { date: 'Sep', value: 58 },
        { date: 'Oct', value: 72 },
        { date: 'Nov', value: 85 },
        { date: 'Dec', value: 95 },
      ],
      '12months': [
        { date: 'Jan', value: 15 },
        { date: 'Feb', value: 22 },
        { date: 'Mar', value: 28 },
        { date: 'Apr', value: 38 },
        { date: 'May', value: 45 },
        { date: 'Jun', value: 52 },
        { date: 'Jul', value: 62 },
        { date: 'Aug', value: 70 },
        { date: 'Sep', value: 78 },
        { date: 'Oct', value: 85 },
        { date: 'Nov', value: 90 },
        { date: 'Dec', value: 94 },
      ],
    };

    return chartDataMap[selectedPeriod] || chartDataMap['1month'];
  };

  const chartData = getChartData();

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

  // Close sidebar on mobile when changing tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Auto-close sidebar on mobile after selecting a tab
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

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
        <div className="px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* Logo and Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Hamburger Menu */}
              <Button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                variant="ghost"
                size="sm"
                className="shrink-0 p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <img src={volinaLogo} alt="Volina AI Logo" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" />
              <span className="text-lg sm:text-xl text-[#333333] dark:text-white whitespace-nowrap hidden xs:inline-block">
                Volina AI
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 p-2 sm:px-3"
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span className="text-sm">{language === 'en' ? 'EN' : 'TR'}</span>
              </Button>

              {/* Dark Mode Toggle */}
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="sm"
                className="p-2"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 shrink-0" />
                ) : (
                  <Moon className="w-4 h-4 shrink-0" />
                )}
              </Button>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="gap-1 sm:gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 sm:px-3"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline text-sm">{t.adminDashboard.logout}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transition-all duration-300 ease-in-out overflow-hidden
          
          /* Mobile styles */
          fixed lg:sticky 
          top-16 
          z-40
          
          /* Height */
          h-[calc(100vh-4rem)]
          
          /* Width and visibility */
          ${isSidebarOpen 
            ? 'w-64' 
            : 'w-0 lg:w-0'
          }
          
          /* Mobile transform */
          ${isSidebarOpen 
            ? 'translate-x-0' 
            : '-translate-x-full lg:translate-x-0'
          }
        `}>
          <nav className="p-4 space-y-2 w-64 h-full overflow-y-auto">
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>{language === 'tr' ? 'Gösterge Paneli' : 'Dashboard'}</span>
            </button>
            <button
              onClick={() => handleTabChange('demo-requests')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'demo-requests'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>{language === 'tr' ? 'Demo Talepleri' : 'Demo Requests'}</span>
              {demoRequests.length > 0 && (
                <span className="ml-auto bg-[#3366FF] text-white text-xs px-2 py-1 rounded-full">
                  {demoRequests.length}
                </span>
              )}
            </button>
            <button
              onClick={() => handleTabChange('messages')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'messages'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{language === 'tr' ? 'Mesajlar' : 'Messages'}</span>
            </button>
            <button
              onClick={() => handleTabChange('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>{language === 'tr' ? 'Analitik' : 'Analytics'}</span>
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>{language === 'tr' ? 'Ayarlar' : 'Settings'}</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'dashboard' && (
            <div>
              {/* Dashboard Header with Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl text-[#333333] dark:text-white mb-2">
                    {language === 'tr' ? 'Gösterge Paneli' : 'Dashboard'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'tr' 
                      ? 'Çağrı performansınızı izleyin ve analiz edin' 
                      : 'Monitor and analyze your call performance'}
                  </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  {/* Assistant Selector */}
                  <select
                    value={selectedAssistant}
                    onChange={(e) => setSelectedAssistant(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF] min-w-[160px]"
                  >
                    <option value="all">
                      {language === 'tr' ? 'Tüm Asistanlar' : 'All Assistants'}
                    </option>
                    <option value="assistant-a">
                      {language === 'tr' ? 'Asistan A' : 'Assistant A'}
                    </option>
                    <option value="assistant-b">
                      {language === 'tr' ? 'Asistan B' : 'Assistant B'}
                    </option>
                  </select>

                  {/* Period Selector */}
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF] min-w-[140px]"
                  >
                    <option value="1month">
                      {language === 'tr' ? 'Son 1 Ay' : 'Last 1 Month'}
                    </option>
                    <option value="3months">
                      {language === 'tr' ? 'Son 3 Ay' : 'Last 3 Months'}
                    </option>
                    <option value="6months">
                      {language === 'tr' ? 'Son 6 Ay' : 'Last 6 Months'}
                    </option>
                    <option value="12months">
                      {language === 'tr' ? 'Son 12 Ay' : 'Last 12 Months'}
                    </option>
                  </select>
                </div>
              </div>

              {/* Dashboard Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Calls */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                      <Phone className="w-8 h-8 text-[#3366FF]" />
                    </div>
                    <div>
                      <h2 className="text-3xl text-[#333333] dark:text-white">
                        {dashboardData.calls}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.adminDashboard.totalCalls}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dashboardData.callsChange.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Average Duration */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                      <Clock className="w-8 h-8 text-[#3366FF]" />
                    </div>
                    <div>
                      <h2 className="text-3xl text-[#333333] dark:text-white">
                        {dashboardData.avgDuration}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.adminDashboard.avgDuration}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dashboardData.avgDurationChange.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Cost */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                      <DollarSign className="w-8 h-8 text-[#3366FF]" />
                    </div>
                    <div>
                      <h2 className="text-3xl text-[#333333] dark:text-white">
                        {dashboardData.totalCost}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.adminDashboard.totalCost}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dashboardData.totalCostChange.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Average Cost */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                      <DollarSign className="w-8 h-8 text-[#3366FF]" />
                    </div>
                    <div>
                      <h2 className="text-3xl text-[#333333] dark:text-white">
                        {dashboardData.avgCost}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.adminDashboard.avgCost}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dashboardData.avgCostChange.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call Success */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-[#3366FF]" />
                    </div>
                    <div>
                      <h2 className="text-3xl text-[#333333] dark:text-white">
                        {dashboardData.callSuccess}%
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t.adminDashboard.callSuccess}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dashboardData.callSuccessChange.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 mt-8">
                <h3 className="text-2xl text-[#333333] dark:text-white mb-4">
                  {t.adminDashboard.chartTitle}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3366FF" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'demo-requests' && (
            <div>
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
                    <>
                      {/* Desktop Table View */}
                      <table className="hidden md:table w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {t.adminDashboard.name}
                            </th>
                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {t.adminDashboard.email}
                            </th>
                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {t.adminDashboard.company}
                            </th>
                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {t.adminDashboard.sector}
                            </th>
                            <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              {t.adminDashboard.date}
                            </th>
                            <th className="px-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
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

                      {/* Mobile Card View */}
                      <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                        {demoRequests.map((request) => (
                          <div 
                            key={request.id}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="text-gray-900 dark:text-gray-100 mb-1">
                                  {request.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {request.email}
                                </p>
                              </div>
                              <Button
                                onClick={() => setSelectedRequest(request)}
                                variant="ghost"
                                size="sm"
                                className="text-[#3366FF] hover:text-[#3366FF]/80 hover:bg-blue-50 dark:hover:bg-blue-900/20 ml-2"
                              >
                                <Info className="w-5 h-5" />
                              </Button>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {t.adminDashboard.company}:
                                </span>
                                <span className="text-gray-900 dark:text-gray-100">
                                  {request.company}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {t.adminDashboard.sector}:
                                </span>
                                <span className="text-gray-900 dark:text-gray-100">
                                  {request.sector}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {t.adminDashboard.date}:
                                </span>
                                <span className="text-gray-900 dark:text-gray-100 text-xs">
                                  {request.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              {/* Messages Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl text-[#333333] dark:text-white mb-2">
                  {language === 'tr' ? 'Mesajlar' : 'Messages'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'tr' ? 'Mesajlarınız burada gösterilecektir.' : 'Your messages will be displayed here.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              {/* Analytics Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl text-[#333333] dark:text-white">
                  {language === 'tr' ? 'Analitik Veriler' : 'Analytics Data'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'tr' ? 'Analitik veriler burada gösterilecektir.' : 'Analytics data will be displayed here.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              {/* Settings Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl text-[#333333] dark:text-white">
                  {language === 'tr' ? 'Ayarlar' : 'Settings'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'tr' ? 'Ayarlarınızı burada yapabilirsiniz.' : 'You can make your settings here.'}
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

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