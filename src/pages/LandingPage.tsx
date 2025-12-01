import React from 'react';
import { Hero } from '../components/Hero';
import { ProblemSolution } from '../components/ProblemSolution';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';

export function LandingPage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}
