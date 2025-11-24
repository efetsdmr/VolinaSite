import React from 'react';
import { PhoneOff, Users, TrendingDown, ArrowRight, Zap, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export function ProblemSolution() {
  const { t } = useLanguage();
  
  const problems = [
    {
      icon: PhoneOff,
      title: t.problemSolution.problem1Title,
      description: t.problemSolution.problem1Desc
    },
    {
      icon: Users,
      title: t.problemSolution.problem2Title,
      description: t.problemSolution.problem2Desc
    },
    {
      icon: TrendingDown,
      title: t.problemSolution.problem3Title,
      description: t.problemSolution.problem3Desc
    }
  ];

  const solutions = [
    {
      icon: Zap,
      title: t.problemSolution.solution1Title,
      description: t.problemSolution.solution1Desc,
      color: '#3366FF'
    },
    {
      icon: CheckCircle,
      title: t.problemSolution.solution2Title,
      description: t.problemSolution.solution2Desc,
      color: '#8C51FF'
    },
    {
      icon: Clock,
      title: t.problemSolution.solution3Title,
      description: t.problemSolution.solution3Desc,
      color: '#3366FF'
    }
  ];

  return (
    <section id="solutions" className="py-16 sm:py-20 lg:py-32 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#333333] dark:text-white mb-4 sm:mb-6">
            {t.problemSolution.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.problemSolution.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Problems */}
          <div>
            <div className="space-y-6 sm:space-y-8">
              {problems.map((problem, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-red-100 dark:border-red-900/30">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center">
                      <problem.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl text-[#333333] dark:text-white mb-1 sm:mb-2">{problem.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{problem.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="relative mt-8 lg:mt-0">
            <div className="mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl text-[#333333] dark:text-white mb-3 sm:mb-4">
                {t.problemSolution.solutionTitle}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                {t.problemSolution.solutionSubtitle}
              </p>
            </div>
            
            {/* Solution Visual */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-[#3366FF]/20 dark:border-[#3366FF]/40">
              <div className="space-y-4 sm:space-y-6">
                {solutions.map((solution, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div 
                        className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${solution.color}15` }}
                      >
                        <solution.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: solution.color }} />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-lg text-[#333333] dark:text-white mb-1">{solution.title}</h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{solution.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
