import React from 'react';
import { PhoneOff, Users, TrendingDown, ArrowRight, Zap, CheckCircle, Clock } from 'lucide-react';

export function ProblemSolution() {
  const problems = [
    {
      icon: PhoneOff,
      title: 'Missed calls = missed revenue',
      description: 'Every unanswered call is a potential customer lost to competitors'
    },
    {
      icon: Users,
      title: 'High call volume',
      description: 'Your team is overwhelmed with incoming leads and follow-ups'
    },
    {
      icon: TrendingDown,
      title: 'Leads slipping through',
      description: 'Valuable prospects fall through the cracks without timely follow-up'
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: '24/7 Instant Response',
      description: 'Never miss a lead - AI answers every call within 3 seconds'
    },
    {
      icon: CheckCircle,
      title: 'Intelligent Qualification',
      description: 'AI filters and qualifies leads based on your criteria'
    },
    {
      icon: Clock,
      title: 'Automated Follow-ups',
      description: 'Smart reminders and callbacks ensure no opportunity is lost'
    }
  ];

  return (
    <section id="solutions" className="py-16 sm:py-20 lg:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Problems */}
          <div>
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-red-600 dark:text-red-400">The Problem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#333333] dark:text-white mb-8 sm:mb-12">
              Traditional Calling is Costing You Thousands
            </h2>
            <div className="space-y-6 sm:space-y-8">
              {problems.map((problem, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                    <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl text-[#333333] dark:text-white mb-1 sm:mb-2">{problem.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="relative mt-8 lg:mt-0">
            <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">The Solution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#333333] dark:text-white mb-8 sm:mb-12">
              AI Voice Agents Handle Everything
            </h2>
            
            {/* Solution Visual */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#3366FF]/20 dark:border-[#3366FF]/40">
              <div className="space-y-4 sm:space-y-6">
                {solutions.map((solution, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex items-center gap-3 sm:gap-4">
                    <div 
                      className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${solution.color}15` }}
                    >
                      <solution.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: solution.color }} />
                    </div>
                    <span className="text-base sm:text-lg text-[#333333] dark:text-white">{solution.title}</span>
                  </div>
                ))}
                
                <div className="flex items-center justify-center pt-2 sm:pt-4">
                  <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#3366FF]" />
                </div>
                
                <div className="bg-gradient-to-r from-[#3366FF] to-[#8C51FF] rounded-xl sm:rounded-2xl p-5 sm:p-6 text-white text-center">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">More Leads Converted</div>
                  <div className="text-sm sm:text-base text-blue-100">Without increasing headcount</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}