import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { LogOut, Users, Moon, Sun, Globe, Info, X, LayoutDashboard, Settings, BarChart3, Menu, TrendingUp, TrendingDown, Phone, Clock, DollarSign, FileText, Search, Check, ChevronDown, Plus, Calendar } from 'lucide-react';
import { useDarkMode } from '../components/DarkModeContext';
import { useLanguage } from '../components/LanguageContext';
import volinaLogo from '../assets/volina-logo.svg';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AdminAbout } from '../components/AdminAbout';
import { AdminContact } from '../components/AdminContact';
import { AssistantSidebar } from '../components/AssistantSidebar';

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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('1month');

  // Analytics filters state
  const [analyticsDateRange, setAnalyticsDateRange] = useState({
    start: '2025-07-11',
    end: '2025-07-12'
  });
  const [analyticsGroupedBy, setAnalyticsGroupedBy] = useState<'Days' | 'Weeks' | 'Months'>('Days');
  const [analyticsSelectedAssistant, setAnalyticsSelectedAssistant] = useState('All Assistants');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDateRange, setTempDateRange] = useState({
    start: '2025-07-11',
    end: '2025-07-12'
  });
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Settings state - Assistant management
  const [selectedAssistantId, setSelectedAssistantId] = useState('assistant-a');
  const [assistantSearchQuery, setAssistantSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAssistant, setNewAssistant] = useState({
    name: '',
    voice: 'tara',
    behavior: '',
    startTime: '09:00',
    endTime: '18:00'
  });
  
  // Mock assistants database
  const [assistantsData, setAssistantsData] = useState({
    'assistant-a': {
      name: 'Assistant A',
      tags: ['deepgram', 'openai', '11labs'],
      voice: 'tara',
      behavior: 'Müşterilere nazik ve profesyonel bir şekilde davranın. Sorulara net ve detaylı cevaplar verin. Müşteri memnuniyetini ön planda tutun.',
      startTime: '09:00',
      endTime: '18:00'
    },
    'assistant-b': {
      name: 'Assistant B',
      tags: ['deepgram', 'openai', 'deepgram'],
      voice: 'jess',
      behavior: 'Be energetic and friendly. Help customers with their inquiries in a professional manner.',
      startTime: '08:00',
      endTime: '17:00'
    },
    'assistant-c': {
      name: 'Assistant C',
      tags: ['deepgram', 'openai', 'vapi'],
      voice: 'cole',
      behavior: 'Restorana gelen rezervasyon taleplerini karşıla. Müsait saatleri söyle ve rezervasyon al.',
      startTime: '10:00',
      endTime: '22:00'
    },
    'assistant-d': {
      name: 'Assistant D',
      tags: ['deepgram', 'openai', 'vapi'],
      voice: 'leo',
      behavior: 'Handle dental clinic appointments. Be calm and reassuring with patients.',
      startTime: '09:00',
      endTime: '18:00'
    }
  });

  const assistantsList = Object.keys(assistantsData).map(id => ({
    id,
    name: assistantsData[id as keyof typeof assistantsData].name,
    tags: assistantsData[id as keyof typeof assistantsData].tags
  }));
  
  const filteredAssistants = assistantsList.filter(assistant =>
    assistant.name.toLowerCase().includes(assistantSearchQuery.toLowerCase()) ||
    assistant.tags.some(tag => tag.toLowerCase().includes(assistantSearchQuery.toLowerCase()))
  );

  const currentAssistant = assistantsData[selectedAssistantId as keyof typeof assistantsData];

  const [settingsSaveMessage, setSettingsSaveMessage] = useState('');
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState(false);
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Voice options with details
  const voiceOptions = [
    {
      id: 'tara',
      name: 'Tara',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%)',
      tags: ['Vapi model', 'Conversational', 'Clear'],
      description: language === 'tr' ? 'Kadın Ses (Türkçe)' : 'Female Voice (Turkish)'
    },
    {
      id: 'cole',
      name: 'Cole',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      tags: ['22 year old white male', 'Deeper tone', 'Calming', 'Professional'],
      description: language === 'tr' ? 'Erkek Ses (Türkçe)' : 'Male Voice (Turkish)'
    },
    {
      id: 'jess',
      name: 'Jess',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #feca57 100%)',
      tags: ['Vapi model', 'Energetic', 'Youthful'],
      description: language === 'tr' ? 'Kadın Ses (İngilizce)' : 'Female Voice (English)'
    },
    {
      id: 'leo',
      name: 'Leo',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
      tags: ['Vapi model', 'Authoritative', 'Deep'],
      description: language === 'tr' ? 'Erkek Ses (İngilizce)' : 'Male Voice (English)'
    },
    {
      id: 'mia',
      name: 'Mia',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 50%, #30cfd0 100%)',
      tags: ['Vapi model', 'Professional', 'Articulate'],
      description: language === 'tr' ? 'Kadın Ses (Profesyonel)' : 'Female Voice (Professional)'
    }
  ];

  const filteredVoices = voiceOptions.filter(voice =>
    voice.name.toLowerCase().includes(voiceSearchQuery.toLowerCase()) ||
    voice.tags.some(tag => tag.toLowerCase().includes(voiceSearchQuery.toLowerCase()))
  );

  const selectedVoice = voiceOptions.find(v => v.id === currentAssistant?.voice) || voiceOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVoiceDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Generate analytics mock data based on filters
  const generateAnalyticsMockData = () => {
    const assistantMultipliers: { [key: string]: number } = {
      'All Assistants': 1,
      'Assistant A': 0.8,
      'Assistant B': 1.2,
      'Assistant C': 0.9,
      'Assistant D': 1.1
    };
    
    const multiplier = assistantMultipliers[analyticsSelectedAssistant] || 1;
    
    // Calculate number of data points based on grouped by
    const getDataPoints = () => {
      if (analyticsGroupedBy === 'Days') return 12;
      if (analyticsGroupedBy === 'Weeks') return 8;
      return 6; // Months
    };
    
    const dataPoints = getDataPoints();
    
    // Generate mini chart data for metric cards
    const generateMiniChartData = (baseValues: number[]) => {
      return baseValues.slice(0, dataPoints).map(v => ({ value: Math.round(v * multiplier) }));
    };
    
    // Metric values
    const metrics = {
      totalCallMinutes: Math.round(113.24 * multiplier),
      numberOfCalls: Math.round(145 * multiplier),
      totalSpent: (10.03 * multiplier).toFixed(2),
      avgCost: (0.07 * multiplier).toFixed(2)
    };
    
    // Mini charts data
    const miniCharts = {
      callMinutes: generateMiniChartData([20, 25, 22, 30, 28, 35, 45, 38, 42, 50, 48, 40]),
      numberOfCalls: generateMiniChartData([15, 18, 20, 22, 25, 30, 28, 35, 45, 38, 32, 28]),
      totalSpent: generateMiniChartData([10, 15, 12, 18, 25, 30, 28, 22, 32, 35, 30, 25]),
      avgCost: generateMiniChartData([8, 10, 12, 15, 18, 20, 25, 30, 35, 32, 28, 25])
    };
    
    // Generate Call Analysis data
    const generateCallEndReasons = () => {
      const labels = analyticsGroupedBy === 'Days' 
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        : analyticsGroupedBy === 'Weeks'
        ? ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
      return labels.slice(0, dataPoints).map(label => ({
        name: label,
        'assistant-ended': Math.round((10 + Math.random() * 15) * multiplier),
        'customer-ended': Math.round((8 + Math.random() * 12) * multiplier),
        'error-resources': Math.round((2 + Math.random() * 5) * multiplier),
        'error-assistant': Math.round((1 + Math.random() * 3) * multiplier)
      }));
    };
    
    const generateCallDuration = () => {
      const assistants = ['Asst 1', 'Asst 2', 'Asst 3', 'Asst 4', 'Asst 5', 'Asst 6', 
                         'Asst 7', 'Asst 8', 'Asst 9', 'Asst 10', 'Asst 11', 'Asst 12'];
      
      return assistants.map((asst, idx) => ({
        assistant: asst,
        duration1: parseFloat((1.2 + Math.random() * 1.2 * multiplier).toFixed(1)),
        duration2: idx === 11 ? parseFloat((1.5 * multiplier).toFixed(1)) : 0
      }));
    };
    
    return {
      metrics,
      miniCharts,
      callEndReasons: generateCallEndReasons(),
      callDuration: generateCallDuration()
    };
  };
  
  const analyticsMockData = generateAnalyticsMockData();

  // Format date for display
  const formatDateForDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
  };

  // Apply date range
  const handleApplyDateRange = () => {
    setAnalyticsDateRange(tempDateRange);
    setShowDatePicker(false);
  };

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
    window.location.href = '/login';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const handleSettingsSave = () => {
    // In a real app, this would save to an API
    console.log('Saving assistant settings for:', selectedAssistantId, currentAssistant);
    
    // Show success message
    setSettingsSaveMessage(t.adminDashboard.settingsSaved);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setSettingsSaveMessage('');
    }, 3000);
  };

  const handleUpdateAssistant = (field: string, value: string) => {
    setAssistantsData(prev => ({
      ...prev,
      [selectedAssistantId]: {
        ...prev[selectedAssistantId as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleCreateAssistant = () => {
    setShowCreateDialog(true);
  };

  const handleSaveNewAssistant = () => {
    if (!newAssistant.name.trim()) {
      alert(t.adminDashboard.assistantNamePlaceholder);
      return;
    }

    // Create unique ID from name
    const assistantId = newAssistant.name.toLowerCase().replace(/\s+/g, '-');
    
    // Add new assistant to database
    setAssistantsData(prev => ({
      ...prev,
      [assistantId]: {
        name: newAssistant.name,
        tags: ['new'],
        voice: newAssistant.voice,
        behavior: newAssistant.behavior,
        startTime: newAssistant.startTime,
        endTime: newAssistant.endTime
      }
    }));

    // Select the newly created assistant
    setSelectedAssistantId(assistantId);

    // Reset form and close dialog
    setNewAssistant({
      name: '',
      voice: 'tara',
      behavior: '',
      startTime: '09:00',
      endTime: '18:00'
    });
    setShowCreateDialog(false);
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
              onClick={() => handleTabChange('about')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'about'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>{language === 'tr' ? 'Hakkında' : 'About'}</span>
            </button>
            <button
              onClick={() => handleTabChange('contact')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'contact'
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#3366FF]'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Phone className="w-5 h-5" />
              <span>{language === 'tr' ? 'İletişim' : 'Contact'}</span>
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
        <main className={`flex-1 ${activeTab === 'settings' ? 'h-[calc(100vh-72px)] p-2' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>
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
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 sm:p-6 border border-gray-100 dark:border-gray-700 mt-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl text-[#333333] dark:text-white mb-3 sm:mb-4">
                  {t.adminDashboard.chartTitle}
                </h3>
                <div className="w-full overflow-x-auto -mx-3 sm:mx-0">
                  <div className="min-w-[280px] px-3 sm:px-0">
                    <ResponsiveContainer width="100%" height={180} className="sm:!h-[220px] lg:!h-[250px]">
                      <LineChart
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 5,
                          left: -25,
                          bottom: 0
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 10 }}
                          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                          interval="preserveStartEnd"
                        />
                        <YAxis 
                          tick={{ fontSize: 10 }}
                          stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                          width={30}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                            border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
                            borderRadius: '8px',
                            color: isDarkMode ? '#F3F4F6' : '#111827',
                            fontSize: '12px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3366FF" 
                          strokeWidth={2}
                          activeDot={{ r: 5 }} 
                          dot={{ r: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
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

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Header with Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl text-white">{t.adminDashboard.metrics}</h2>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Date Range Picker */}
                  <div className="relative" ref={datePickerRef}>
                    <button
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white text-sm hover:border-gray-600 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{formatDateForDisplay(analyticsDateRange.start)} - {formatDateForDisplay(analyticsDateRange.end)}</span>
                    </button>

                    {/* Date Picker Dropdown */}
                    {showDatePicker && (
                      <div className="absolute top-full mt-2 right-0 bg-[#1a1a1a] border border-gray-700 rounded-lg p-4 shadow-xl z-50 min-w-[320px]">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-400 text-xs mb-2">{t.adminDashboard.startDate}</label>
                            <input
                              type="date"
                              value={tempDateRange.start}
                              onChange={(e) => setTempDateRange({ ...tempDateRange, start: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-400 text-xs mb-2">{t.adminDashboard.endDate}</label>
                            <input
                              type="date"
                              value={tempDateRange.end}
                              onChange={(e) => setTempDateRange({ ...tempDateRange, end: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowDatePicker(false)}
                              className="flex-1 px-3 py-2 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white text-sm hover:bg-[#1a1a1a] transition-colors"
                            >
                              {t.adminDashboard.cancel}
                            </button>
                            <button
                              onClick={handleApplyDateRange}
                              className="flex-1 px-3 py-2 rounded-lg bg-[#3366FF] text-white text-sm hover:bg-[#2555DD] transition-colors"
                            >
                              {t.adminDashboard.apply}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Grouped By */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{t.adminDashboard.groupedBy}</span>
                    <select 
                      value={analyticsGroupedBy}
                      onChange={(e) => setAnalyticsGroupedBy(e.target.value as 'Days' | 'Weeks' | 'Months')}
                      className="px-3 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                    >
                      <option>{t.adminDashboard.days}</option>
                      <option>{t.adminDashboard.weeks}</option>
                      <option>{t.adminDashboard.months}</option>
                    </select>
                  </div>

                  {/* All Assistants Dropdown */}
                  <select 
                    value={analyticsSelectedAssistant}
                    onChange={(e) => setAnalyticsSelectedAssistant(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                  >
                    <option>{t.adminDashboard.allAssistants}</option>
                    <option>Assistant A</option>
                    <option>Assistant B</option>
                    <option>Assistant C</option>
                    <option>Assistant D</option>
                  </select>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Call Minutes */}
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-2">{t.adminDashboard.totalCallMinutes}</div>
                  <div className="text-white text-3xl mb-4">{analyticsMockData.metrics.totalCallMinutes}</div>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={analyticsMockData.miniCharts.callMinutes}>
                      <defs>
                        <linearGradient id="colorProjectBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3366FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3366FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#3366FF" fill="url(#colorProjectBlue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Number of Calls */}
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-2">{t.adminDashboard.numberOfCalls}</div>
                  <div className="text-white text-3xl mb-4">{analyticsMockData.metrics.numberOfCalls}</div>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={analyticsMockData.miniCharts.numberOfCalls}>
                      <defs>
                        <linearGradient id="colorProjectPurple" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8C51FF" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8C51FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#8C51FF" fill="url(#colorProjectPurple)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Total Spent */}
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-2">{t.adminDashboard.totalSpent}</div>
                  <div className="text-white text-3xl mb-4">${analyticsMockData.metrics.totalSpent}</div>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={analyticsMockData.miniCharts.totalSpent}>
                      <defs>
                        <linearGradient id="colorLightPurple" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#a78bfa" fill="url(#colorLightPurple)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Average Cost per Call */}
                <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                  <div className="text-gray-400 text-sm mb-2">{t.adminDashboard.avgCostPerCall}</div>
                  <div className="text-white text-3xl mb-4">${analyticsMockData.metrics.avgCost}</div>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart data={analyticsMockData.miniCharts.avgCost}>
                      <defs>
                        <linearGradient id="colorDarkBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="value" stroke="#2563eb" fill="url(#colorDarkBlue)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Call Analysis Section */}
              <div>
                <h2 className="text-2xl text-white mb-6">{t.adminDashboard.callAnalysis}</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Reason Call Ended - Stacked Bar Chart */}
                  <div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 border border-gray-800">
                    <h3 className="text-white text-base sm:text-lg mb-6">{t.adminDashboard.reasonCallEnded}</h3>
                    <div className="flex flex-wrap gap-3 mb-4 lg:hidden">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#3366FF]"></div>
                        <span className="text-gray-400 text-xs">Asistan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#8C51FF]"></div>
                        <span className="text-gray-400 text-xs">Müşteri</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#7c3aed]"></div>
                        <span className="text-gray-400 text-xs">Hata 1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#c084fc]"></div>
                        <span className="text-gray-400 text-xs">Hata 2</span>
                      </div>
                    </div>
                    <div className="h-[450px] lg:h-[500px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsMockData.callEndReasons} margin={{ top: 10, right: 10, left: -10, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            stroke="#9ca3af" 
                            tick={{ fill: '#9ca3af', fontSize: 9 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                          />
                          <YAxis 
                            stroke="#9ca3af" 
                            tick={{ fill: '#9ca3af', fontSize: 9 }}
                            width={30}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend 
                            wrapperStyle={{ paddingTop: '10px' }}
                            className="hidden lg:block"
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => {
                              const labels: { [key: string]: string } = {
                                'assistant-ended': 'Asistan Sonlandırdı',
                                'customer-ended': 'Müşteri Sonlandırdı',
                                'error-resources': 'Hata: Kaynaklar',
                                'error-assistant': 'Hata: Asistan'
                              };
                              return <span style={{ color: '#9ca3af', fontSize: '10px' }}>{labels[value] || value}</span>;
                            }}
                          />
                          <Bar dataKey="assistant-ended" stackId="a" fill="#3366FF" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="customer-ended" stackId="a" fill="#8C51FF" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="error-resources" stackId="a" fill="#7c3aed" radius={[0, 0, 0, 0]} />
                          <Bar dataKey="error-assistant" stackId="a" fill="#c084fc" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Average Call Duration by Assistant */}
                  <div className="bg-[#1a1a1a] rounded-xl p-4 sm:p-6 border border-gray-800">
                    <h3 className="text-white text-base sm:text-lg mb-6">{t.adminDashboard.avgCallDurationByAssistant}</h3>
                    <div className="h-[450px] lg:h-[500px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analyticsMockData.callDuration} margin={{ top: 10, right: 10, left: -10, bottom: 30 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                          <XAxis 
                            dataKey="assistant" 
                            stroke="#9ca3af" 
                            tick={{ fill: '#9ca3af', fontSize: 9 }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                          />
                          <YAxis 
                            stroke="#9ca3af" 
                            tick={{ fill: '#9ca3af', fontSize: 9 }}
                            width={30}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', fontSize: '12px' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Bar dataKey="duration1" fill="#3366FF" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="duration2" fill="#8C51FF" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex gap-0 h-full rounded-xl overflow-hidden">
              {/* Left Sidebar - Assistant List (Desktop Only) */}
              <div className="hidden lg:block">
                <AssistantSidebar
                  assistants={filteredAssistants}
                  selectedId={selectedAssistantId}
                  searchQuery={assistantSearchQuery}
                  onSearchChange={setAssistantSearchQuery}
                  onSelectAssistant={setSelectedAssistantId}
                  onCreateNew={handleCreateAssistant}
                />
              </div>

              {/* Right Content - Settings Form */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900">
                {/* Mobile Assistant Selector */}
                <div className="lg:hidden mb-6">
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'tr' ? 'Asistan Seç' : 'Select Assistant'}
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={selectedAssistantId}
                      onChange={(e) => setSelectedAssistantId(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                    >
                      {filteredAssistants.map((assistant) => (
                        <option key={assistant.id} value={assistant.id}>
                          {assistant.name}
                        </option>
                      ))}
                    </select>
                    <Button
                      onClick={handleCreateAssistant}
                      className="shrink-0 bg-[#3366FF] hover:bg-[#3366FF]/90 text-white px-4 py-3 rounded-lg"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Settings Header */}
                <div className="mb-6">
                  <h2 className="text-2xl text-[#333333] dark:text-white mb-2">
                    {t.adminDashboard.settingsTitle}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.adminDashboard.settingsSubtitle}
                  </p>
                </div>

                {/* Success Message */}
                {settingsSaveMessage && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300">
                    {settingsSaveMessage}
                  </div>
                )}

                {/* Settings Form */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 space-y-6">
                  {/* Assistant Name */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t.adminDashboard.assistantName}
                    </label>
                    <input
                      type="text"
                      value={currentAssistant.name}
                      onChange={(e) => handleUpdateAssistant('name', e.target.value)}
                      placeholder={t.adminDashboard.assistantNamePlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                    />
                  </div>

                  {/* Voice Settings */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t.adminDashboard.voiceSettings}
                    </label>
                    
                    {/* Voice Dropdown Button */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full shrink-0"
                            style={{ background: selectedVoice.gradient }}
                          />
                          <div className="text-left">
                            <div className="text-sm">{selectedVoice.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {selectedVoice.description}
                            </div>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isVoiceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {isVoiceDropdownOpen && (
                        <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl overflow-hidden">
                          {/* Search Input */}
                          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input
                                type="text"
                                value={voiceSearchQuery}
                                onChange={(e) => setVoiceSearchQuery(e.target.value)}
                                placeholder={t.adminDashboard.voiceSearchPlaceholder}
                                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                              />
                            </div>
                          </div>

                          {/* Voice Options List */}
                          <div className="max-h-80 overflow-y-auto">
                            {filteredVoices.map((voice) => (
                              <div
                                key={voice.id}
                                onClick={() => {
                                  handleUpdateAssistant('voice', voice.id);
                                  setIsVoiceDropdownOpen(false);
                                  setVoiceSearchQuery('');
                                }}
                                className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                                  currentAssistant.voice === voice.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start gap-3 flex-1">
                                    <div
                                      className="w-12 h-12 rounded-full shrink-0"
                                      style={{ background: voice.gradient }}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-900 dark:text-gray-100">
                                          {voice.name}
                                        </span>
                                      </div>
                                      <div className="flex flex-wrap gap-1.5 mb-2">
                                        {voice.tags.map((tag, index) => (
                                          <span
                                            key={index}
                                            className="px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  {currentAssistant.voice === voice.id && (
                                    <Check className="w-5 h-5 text-[#3366FF] shrink-0 ml-2" />
                                  )}
                                </div>
                              </div>
                            ))}
                            {filteredVoices.length === 0 && (
                              <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                                {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Behavior Settings */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t.adminDashboard.behaviorSettings}
                    </label>
                    <textarea
                      value={currentAssistant.behavior}
                      onChange={(e) => handleUpdateAssistant('behavior', e.target.value)}
                      placeholder={t.adminDashboard.behaviorPlaceholder}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF] resize-none"
                    />
                  </div>

                  {/* Knowledge Base Upload */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {t.adminDashboard.knowledgeBase || 'Bilgi Bankası'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#3366FF] dark:hover:border-[#3366FF] transition-colors">
                      <input
                        type="file"
                        id="knowledge-upload"
                        accept=".txt,.doc,.docx"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            console.log('Uploaded files:', Array.from(files).map(f => f.name));
                            // Handle file upload logic here
                          }
                        }}
                      />
                      <label
                        htmlFor="knowledge-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-[#3366FF] hover:underline">{t.adminDashboard.uploadFile || 'Dosya yükle'}</span>
                          {' '}{t.adminDashboard.orDragDrop || 'veya sürükle bırak'}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          TXT, DOC, DOCX
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {t.adminDashboard.workingHours}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {t.adminDashboard.startTime}
                        </label>
                        <input
                          type="time"
                          value={currentAssistant.startTime}
                          onChange={(e) => handleUpdateAssistant('startTime', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                          {t.adminDashboard.endTime}
                        </label>
                        <input
                          type="time"
                          value={currentAssistant.endTime}
                          onChange={(e) => handleUpdateAssistant('endTime', e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Save Button */}
                  <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                    <Button
                      onClick={handleSettingsSave}
                      className="w-full bg-gradient-to-r from-[#3366FF] to-[#8C51FF] hover:opacity-90 text-white py-3 rounded-xl"
                    >
                      {t.adminDashboard.saveSettings}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div>
              {/* About Content */}
              <AdminAbout />
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              {/* Contact Content */}
              <AdminContact />
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

      {/* Create Assistant Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Dialog Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
              <h3 className="text-xl text-gray-900 dark:text-white">
                {t.adminDashboard.createAssistant}
              </h3>
              <Button
                onClick={() => {
                  setShowCreateDialog(false);
                  setNewAssistant({
                    name: '',
                    voice: 'tara',
                    behavior: '',
                    startTime: '09:00',
                    endTime: '18:00'
                  });
                }}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 space-y-6">
              {/* Assistant Name */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {t.adminDashboard.assistantName}
                </label>
                <input
                  type="text"
                  value={newAssistant.name}
                  onChange={(e) => setNewAssistant(prev => ({ ...prev, name: e.target.value }))}
                  placeholder={t.adminDashboard.assistantNamePlaceholder}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                />
              </div>

              {/* Voice Settings */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {t.adminDashboard.voiceSettings}
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ background: voiceOptions.find(v => v.id === newAssistant.voice)?.gradient }}
                      />
                      <div>
                        <div className="text-gray-900 dark:text-gray-100">
                          {voiceOptions.find(v => v.id === newAssistant.voice)?.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {voiceOptions.find(v => v.id === newAssistant.voice)?.description}
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isVoiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isVoiceDropdownOpen && (
                    <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 shadow-xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder={t.adminDashboard.voiceSearchPlaceholder}
                            value={voiceSearchQuery}
                            onChange={(e) => setVoiceSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                          />
                        </div>
                      </div>

                      <div className="p-2">
                        {filteredVoices.map((voice) => (
                          <button
                            key={voice.id}
                            onClick={() => {
                              setNewAssistant(prev => ({ ...prev, voice: voice.id }));
                              setIsVoiceDropdownOpen(false);
                              setVoiceSearchQuery('');
                            }}
                            className="w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center gap-3 text-left"
                          >
                            <div
                              className="w-12 h-12 rounded-lg shrink-0"
                              style={{ background: voice.gradient }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-900 dark:text-gray-100">{voice.name}</span>
                                {newAssistant.voice === voice.id && (
                                  <Check className="w-4 h-4 text-[#3366FF]" />
                                )}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {voice.description}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {voice.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Behavior Settings */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {t.adminDashboard.behaviorSettings}
                </label>
                <textarea
                  value={newAssistant.behavior}
                  onChange={(e) => setNewAssistant(prev => ({ ...prev, behavior: e.target.value }))}
                  placeholder={t.adminDashboard.behaviorPlaceholder}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF] resize-none"
                />
              </div>

              {/* Knowledge Base Upload */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {t.adminDashboard.knowledgeBase || 'Bilgi Bankası'}
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#3366FF] dark:hover:border-[#3366FF] transition-colors">
                  <input
                    type="file"
                    id="knowledge-upload-new"
                    accept=".txt,.doc,.docx"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        console.log('Uploaded files:', Array.from(files).map(f => f.name));
                      }
                    }}
                  />
                  <label
                    htmlFor="knowledge-upload-new"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-[#3366FF] hover:underline">{t.adminDashboard.uploadFile || 'Dosya yükle'}</span>
                      {' '}{t.adminDashboard.orDragDrop || 'veya sürükle bırak'}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      TXT, DOC, DOCX
                    </p>
                  </label>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {t.adminDashboard.workingHours}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {t.adminDashboard.startTime}
                    </label>
                    <input
                      type="time"
                      value={newAssistant.startTime}
                      onChange={(e) => setNewAssistant(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {t.adminDashboard.endTime}
                    </label>
                    <input
                      type="time"
                      value={newAssistant.endTime}
                      onChange={(e) => setNewAssistant(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#3366FF]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3 justify-end">
              <Button
                onClick={() => {
                  setShowCreateDialog(false);
                  setNewAssistant({
                    name: '',
                    voice: 'tara',
                    behavior: '',
                    startTime: '09:00',
                    endTime: '18:00'
                  });
                }}
                variant="outline"
              >
                {t.adminDashboard.close}
              </Button>
              <Button
                onClick={handleSaveNewAssistant}
                className="bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white"
              >
                {t.adminDashboard.createAssistant}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}