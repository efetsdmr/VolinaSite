import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';
import { TryVolinaModal } from './TryVolinaModal';

export function Testimonials() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isTryModalOpen, setIsTryModalOpen] = useState(false);

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
      quote: t.testimonials.testimonial1Text,
      author: t.testimonials.testimonial1Author,
      role: t.testimonials.testimonial1Role,
      showButton: true
    },
    {
      quote: t.testimonials.testimonial2Text,
      author: t.testimonials.testimonial2Author,
      role: t.testimonials.testimonial2Role,
      showButton: true
    },
    {
      quote: t.testimonials.testimonial3Text,
      author: t.testimonials.testimonial3Author,
      role: t.testimonials.testimonial3Role,
      showButton: true
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
    <section id="case-studies" className="py-16 sm:py-20 lg:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">{t.nav.caseStudies}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-3 sm:mb-6 px-4">
            {t.testimonials.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div 
                key={currentIndex + index}
                className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <Quote className="w-10 h-10 sm:w-12 sm:h-12 text-[#3366FF] mb-4 sm:mb-6" />
                
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="mt-auto">
                  <div className="text-base sm:text-lg text-[#333333] dark:text-white">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
                
                {testimonial.showButton && (
                  <button 
                    onClick={() => setIsTryModalOpen(true)}
                    className="mt-4 w-full px-4 py-2.5 bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base"
                  >
                    {t.testimonials.tryModel}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > itemsPerPage && (
            <div className="flex items-center justify-center gap-4 mt-8 sm:mt-12">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {currentIndex + 1} / {maxIndex + 1}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Try Volina Modal */}
      <TryVolinaModal isOpen={isTryModalOpen} onClose={() => setIsTryModalOpen(false)} />
    </section>
  );
}
