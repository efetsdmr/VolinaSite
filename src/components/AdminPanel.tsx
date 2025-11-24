import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Settings, BarChart3, Users, Phone } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function AdminPanel() {
  const { t } = useLanguage();
  
  const features = [
    { icon: Phone, text: t.adminPanel.tab1 },
    { icon: Users, text: t.adminPanel.tab2 },
    { icon: BarChart3, text: t.adminPanel.tab3 },
    { icon: Settings, text: t.adminPanel.dashboardTitle }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-[#8C51FF] dark:text-purple-400">{t.adminPanel.dashboardTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-4 sm:mb-6">
              {t.adminPanel.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
              {t.adminPanel.subtitle}
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#3366FF] to-[#8C51FF] flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-base sm:text-lg text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#333333] dark:bg-gray-700 text-white rounded-xl hover:bg-[#333333]/90 dark:hover:bg-gray-600 transition-colors text-base sm:text-lg">
              {t.adminPanel.tryDashboard}
            </button>
          </div>

          {/* Right - Dashboard Preview */}
          <div className="relative order-1 lg:order-2">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3366FF]/20 to-[#8C51FF]/20 rounded-2xl sm:rounded-3xl blur-3xl"></div>
            
            {/* Dashboard Mockup */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-gray-100 dark:bg-gray-900 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-2 sm:ml-4 flex-1 bg-white dark:bg-gray-800 rounded px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-gray-500 dark:text-gray-400">
                  dashboard.volina-ai.com
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzNzEyNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dashboard Analytics Interface"
                  className="w-full h-auto rounded-lg shadow-lg"
                />

                {/* Overlay Stats */}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-lg sm:text-2xl text-[#3366FF] mb-0.5 sm:mb-1">1,247</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t.adminPanel.totalCalls}</div>
                  </div>
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-lg sm:text-2xl text-[#8C51FF] mb-0.5 sm:mb-1">89%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t.adminPanel.successRate}</div>
                  </div>
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-lg sm:text-2xl text-green-600 mb-0.5 sm:mb-1">324</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{t.adminPanel.leadsConverted}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
