import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from './LanguageContext';

export function Pricing() {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: t.pricing.starter,
      price: t.pricing.starterPrice,
      period: t.pricing.perMonth,
      description: t.pricing.starterDesc,
      features: [
        t.pricing.starterFeature1,
        t.pricing.starterFeature2,
        t.pricing.starterFeature3,
        t.pricing.starterFeature4
      ],
      cta: t.pricing.getStarted,
      popular: false
    },
    {
      name: t.pricing.professional,
      price: t.pricing.professionalPrice,
      period: t.pricing.perMonth,
      description: t.pricing.professionalDesc,
      features: [
        t.pricing.professionalFeature1,
        t.pricing.professionalFeature2,
        t.pricing.professionalFeature3,
        t.pricing.professionalFeature4,
        t.pricing.professionalFeature5
      ],
      cta: t.pricing.getStarted,
      popular: true
    },
    {
      name: t.pricing.enterprise,
      price: t.pricing.enterprisePrice,
      period: '',
      description: t.pricing.enterpriseDesc,
      features: [
        t.pricing.enterpriseFeature1,
        t.pricing.enterpriseFeature2,
        t.pricing.enterpriseFeature3,
        t.pricing.enterpriseFeature4,
        t.pricing.enterpriseFeature5
      ],
      cta: t.pricing.contactSales,
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">{t.nav.pricing}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-3 sm:mb-6 px-4">
            {t.pricing.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 ${
                plan.popular
                  ? 'border-[#3366FF] shadow-2xl lg:scale-105'
                  : 'border-gray-200 dark:border-gray-700 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm flex items-center gap-2">
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t.pricing.mostPopular}
                  </div>
                </div>
              )}

              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl text-[#333333] dark:text-white mb-1 sm:mb-2">{plan.name}</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl text-[#333333] dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-5 sm:py-6 text-base sm:text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#3366FF] to-[#8C51FF] hover:opacity-90'
                    : 'bg-[#333333] dark:bg-gray-700 hover:bg-[#333333]/90 dark:hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
