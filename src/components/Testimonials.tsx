import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      industry: 'Real Estate',
      company: 'Premier Properties Group',
      metric: '$140k',
      metricLabel: 'labour saved annually',
      quote: 'VoiceFlow AI transformed our lead response time. We went from missing 60% of inbound calls to answering 100%. Our conversion rate doubled in the first month.',
      author: 'Sarah Mitchell',
      role: 'VP of Sales',
      avatar: '👩‍💼'
    },
    {
      industry: 'Dental Clinics',
      company: 'SmileCare Network',
      metric: '20%',
      metricLabel: 'more qualified leads in 24h',
      quote: 'The AI voice agent handles appointment bookings, reminders, and follow-ups flawlessly. Our front desk staff can now focus on patient care instead of phones.',
      author: 'Dr. James Chen',
      role: 'Practice Owner',
      avatar: '👨‍⚕️'
    },
    {
      industry: 'Insurance',
      company: 'SecureLife Insurance',
      metric: '3x',
      metricLabel: 'increase in quote requests',
      quote: 'We process thousands of calls daily now. The multi-language support means we can serve our diverse customer base 24/7. Game-changing technology.',
      author: 'Maria Rodriguez',
      role: 'Operations Director',
      avatar: '👩‍💼'
    },
    {
      industry: 'Home Services',
      company: 'QuickFix Plumbing',
      metric: '85%',
      metricLabel: 'reduction in missed calls',
      quote: 'Before VoiceFlow, we missed calls when our team was on job sites. Now every emergency gets answered immediately, and we book 40% more jobs.',
      author: 'Mike Thompson',
      role: 'Owner',
      avatar: '👨‍🔧'
    },
    {
      industry: 'E-commerce',
      company: 'TrendyGoods Online',
      metric: '$2M',
      metricLabel: 'additional revenue captured',
      quote: 'The AI handles customer inquiries, tracks orders, and solves issues without human intervention. Our customer satisfaction scores are at an all-time high.',
      author: 'Emily Chang',
      role: 'CEO',
      avatar: '👩'
    }
  ];

  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="case-studies" className="py-12 sm:py-16 lg:py-32 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">Success Stories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-3 sm:mb-6 px-4">
            Real Results from Real Businesses
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            See how companies across industries are scaling with AI voice automation
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hidden md:flex dark:bg-gray-800 dark:border-gray-700"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
          <Button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg hidden md:flex dark:bg-gray-800 dark:border-gray-700"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div key={currentIndex + index} className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                {/* Industry Badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-[#3366FF] dark:text-blue-400 text-xs sm:text-sm mb-4 sm:mb-6">
                  {testimonial.industry}
                </div>

                {/* Metric */}
                <div className="mb-4 sm:mb-6">
                  <div className="text-3xl sm:text-4xl md:text-5xl text-[#333333] dark:text-white mb-1 sm:mb-2">{testimonial.metric}</div>
                  <div className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{testimonial.metricLabel}</div>
                </div>

                {/* Quote */}
                <div className="relative mb-4 sm:mb-6">
                  <Quote className="absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 text-[#3366FF] opacity-20" />
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed pl-4 sm:pl-6">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100 dark:border-gray-700">
                  <div className="text-3xl sm:text-4xl">{testimonial.avatar}</div>
                  <div>
                    <div className="text-sm sm:text-base text-[#333333] dark:text-white">{testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator - Mobile friendly */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {Array.from({ length: testimonials.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#3366FF] w-6' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Dots Indicator - Desktop */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#3366FF] w-8' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Bar */}
        <div className="mt-10 sm:mt-16 text-center">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 px-4">Trusted by over 2,000+ businesses worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 opacity-50 px-4">
            <div className="text-base sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-500">COMPANY</div>
            <div className="text-base sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-500">BRAND</div>
            <div className="text-base sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-500">BUSINESS</div>
            <div className="text-base sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-500">ENTERPRISE</div>
            <div className="text-base sm:text-xl lg:text-2xl text-gray-400 dark:text-gray-500">STARTUP</div>
          </div>
        </div>
      </div>
    </section>
  );
}