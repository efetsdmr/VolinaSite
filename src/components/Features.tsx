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
      </div>
    </section>
  );
}