import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useDarkMode } from '../components/DarkModeContext';
import { useLanguage } from '../components/LanguageContext';
import volinaLogo from '../assets/volina-logo.svg';

export function AdminLogin() {
  const { isDarkMode } = useDarkMode();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call the actual login API
      const response = await fetch(
        `https://ahudio-site-backend.onrender.com/login/?username=${encodeURIComponent(formData.username)}&password=${encodeURIComponent(formData.password)}`,
        {
          method: 'POST',
          headers: {
            'accept': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        
        // Store auth token or user data if provided
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
        }
        
        // Redirect to admin dashboard or show success
        // For now, just log success
        alert('Login successful!');
        
        // You can redirect to a dashboard page here
        // window.location.href = '/admin/dashboard';
      } else {
        const errorData = await response.json().catch(() => null);
        setError(errorData?.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 transition-colors duration-300 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-100 via-purple-50 to-transparent dark:from-blue-900 dark:via-purple-900"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-purple-100 via-blue-50 to-transparent dark:from-purple-900 dark:via-blue-900"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 dark:border-gray-700">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <img src={volinaLogo} alt="Volina AI Logo" className="w-12 h-12" />
              <span className="text-2xl text-[#333333] dark:text-white">Volina AI</span>
            </div>
            <h1 className="text-3xl text-[#333333] dark:text-white mb-2">
              {t.adminLogin.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t.adminLogin.subtitle}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                {t.adminLogin.username}
              </Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="username"
                  type="text"
                  placeholder={t.adminLogin.usernamePlaceholder}
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:border-[#3366FF] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                {t.adminLogin.password}
              </Label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={t.adminLogin.passwordPlaceholder}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white focus:border-[#3366FF] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !formData.username || !formData.password}
              className="w-full bg-[#3366FF] hover:bg-[#3366FF]/90 text-white py-3 px-6 rounded-xl text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  {t.adminLogin.signingIn}
                </span>
              ) : (
                t.adminLogin.signIn
              )}
            </Button>
          </form>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#3366FF] dark:hover:text-[#3366FF] transition-colors"
            >
              ← {t.adminLogin.backToHome}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}