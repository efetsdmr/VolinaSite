import React from 'react';
import { Mic, Globe, UserCircle, Workflow, RefreshCw, BarChart3 } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Mic,
      title: 'Real-time Human-like Voice',
      description: 'Advanced neural voices that sound natural and engaging. Indistinguishable from human agents.',
      color: '#3366FF'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Speak to customers in 30+ languages with native accents and cultural awareness.',
      color: '#8C51FF'
    },
    {
      icon: UserCircle,
      title: 'Voice Profiles',
      description: 'Choose from multiple voice profiles. Customize gender, tone, accent, and speaking style.',
      color: '#3366FF'
    },
    {
      icon: Workflow,
      title: 'Campaign Workflow & Rules',
      description: 'Build complex call flows with our visual rule engine. Branch logic based on responses.',
      color: '#8C51FF'
    },
    {
      icon: RefreshCw,
      title: 'Persistent Follow-up',
      description: 'Automatic follow-up calls and objection handling. Never let a lead go cold.',
      color: '#3366FF'
    },
    {
      icon: BarChart3,
      title: 'Dashboard & Analytics',
      description: 'Complete transcripts, sentiment analysis, and conversion tracking in real-time.',
      color: '#8C51FF'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-[#8C51FF] dark:text-purple-400">Features</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-3 sm:mb-6 px-4">
            Everything You Need to Scale
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Powerful features designed to convert more leads and save time
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-gray-100 dark:border-gray-700 hover:border-[#3366FF] dark:hover:border-[#3366FF] transition-all hover:shadow-xl"
            >
              <div 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl text-[#333333] dark:text-white mb-2 sm:mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-10 sm:mt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#3366FF]/20 dark:border-[#3366FF]/40">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#333333] dark:text-white mb-4 sm:mb-6">
                Built for Enterprise, Priced for Scale
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                Whether you're making 100 calls or 100,000 calls per month, our infrastructure scales effortlessly. Enterprise-grade security, 99.9% uptime SLA, and dedicated support.
              </p>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#3366FF] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">SOC 2 Type II Certified</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#3366FF] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">GDPR & CCPA Compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#3366FF] flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">24/7 Priority Support</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🚀</div>
                <div className="text-4xl sm:text-5xl text-[#333333] dark:text-white mb-1 sm:mb-2">10M+</div>
                <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">Calls processed monthly</div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                  <div>
                    <div className="text-2xl sm:text-3xl text-[#3366FF]">98.7%</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl text-[#8C51FF]">4.9/5</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Customer Rating</div>
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