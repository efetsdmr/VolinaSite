import React from 'react';
import { Phone, Calendar, ArrowRight, Cpu } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Phone,
      title: 'Connect & Dial',
      description: 'Integrate with Twilio or your phone system. Our platform automatically dials your lead list.',
      color: '#3366FF',
      step: '01'
    },
    {
      icon: Cpu,
      title: 'AI Engine Processes',
      description: 'Real-time audio is sent to our AI engine. Natural language processing understands intent and responds naturally.',
      color: '#8C51FF',
      step: '02'
    },
    {
      icon: Calendar,
      title: 'Books & Notifies',
      description: 'AI books qualified appointments directly to your calendar. You get notified instantly with call summary.',
      color: '#3366FF',
      step: '03'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-[#3366FF] dark:text-blue-400">How It Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-3 sm:mb-6 px-4">
            Three Simple Steps to Success
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Our AI voice platform seamlessly integrates with your existing workflow
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#3366FF] to-[#8C51FF] flex items-center justify-center shadow-lg">
                  <span className="text-lg sm:text-2xl text-white">{step.step}</span>
                </div>

                {/* Icon */}
                <div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mt-6 sm:mt-8"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <step.icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: step.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl text-[#333333] dark:text-white mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4 sm:mt-6">
                    <ArrowRight className="w-6 h-6 text-[#3366FF]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-16 px-4">
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">Ready to automate your calls?</p>
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white rounded-xl hover:opacity-90 transition-opacity text-base sm:text-lg">
            Start Free Trial
          </button>
        </div>
      </div>
    </section>
  );
}