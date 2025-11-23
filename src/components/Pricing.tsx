import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$299',
      period: '/month',
      description: 'Perfect for small teams testing AI voice',
      features: [
        'Up to 500 calls/month',
        '2 voice profiles',
        'Basic analytics dashboard',
        'Email support',
        'Single campaign',
        'Standard voice quality'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$799',
      period: '/month',
      description: 'For growing businesses scaling outreach',
      features: [
        'Up to 5,000 calls/month',
        '10 custom voice profiles',
        'Advanced analytics & AI insights',
        'Priority phone & chat support',
        'Unlimited campaigns',
        'Premium voice quality',
        'Multi-language support (10 languages)',
        'CRM integrations (Salesforce, HubSpot)'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams with complex needs',
      features: [
        'Unlimited calls',
        'Unlimited voice profiles',
        'Custom AI training',
        'Dedicated account manager',
        'White-label options',
        'Advanced security & compliance',
        'Custom integrations',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 lg:py-32 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm text-green-600 dark:text-green-400">Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-[#333333] dark:text-white mb-3 sm:mb-6 px-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Choose the plan that fits your business. All plans include 14-day free trial.
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
                    Most Popular
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

              <Button
                className={`w-full mb-6 sm:mb-8 py-5 sm:py-6 text-base sm:text-lg ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#3366FF] to-[#8C51FF] text-white hover:opacity-90'
                    : 'bg-[#333333] dark:bg-gray-700 text-white hover:bg-[#333333]/90 dark:hover:bg-gray-600'
                }`}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-3 sm:space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center mt-0.5">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Callout */}
        <div className="mt-10 sm:mt-16 text-center px-4">
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">Have questions about pricing?</p>
          <a href="#" className="text-sm sm:text-base text-[#3366FF] hover:underline">
            View detailed pricing FAQ →
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 opacity-60 px-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}