'use client';

import React from 'react';
import Image from 'next/image';
import Toggle from './Toggle';
import WaitlistForm from './WaitlistForm';

interface HeroProps {
  isBuyer: boolean;
  onToggle: (buyer: boolean) => void;
}

export default function Hero({ isBuyer, onToggle }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 theme-transition">
      {/* Main Container */}
      <div className="w-full max-w-7xl bg-[var(--bg-primary)] rounded-3xl overflow-hidden shadow-2xl flex min-h-[90vh] theme-transition">
        {/* Left Panel - Visual/Branding */}
        <div className="hidden lg:flex lg:w-2/5 relative">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
            {/* Logo */}
            <div className="absolute top-8 left-8 z-10">
              <Image
                src="/images/logo.png"
                alt="ANVIL Logo"
                width={100}
                height={100}
              />
            </div>
            
            {/* Background Image Placeholder - Modern Manufacturing Facility */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 via-[#ff6b35]/30 to-[#ff6b35]/40">
              {/* Simulated industrial/architectural elements */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-lg transform rotate-12"></div>
              <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-lg transform -rotate-12"></div>
              <div className="absolute bottom-1/3 left-1/3 w-40 h-20 bg-white/8 rounded-lg"></div>
              <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-white/6 rounded-lg transform rotate-45"></div>
            </div>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
              <h2 className="text-4xl font-sleek-bold mb-4 leading-tight">
                Build your future, one product at a time.
              </h2>
              <p className="text-xl mb-6 text-white/90 leading-relaxed font-sleek">
                Join a community of manufacturers shaping tomorrow.
              </p>
              <p className="text-sm text-white/70 italic font-sleek-light">
                ANVIL — Your gateway to manufacturing excellence.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Interactive/Form */}
        <div className="w-full lg:w-3/5 bg-[var(--bg-primary)] flex items-center justify-center p-8 lg:p-12 relative overflow-hidden theme-transition">
          {/* Mobile Orange Background Elements */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-[#ff6b35]/10 via-[#ff6b35]/5 to-transparent">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#ff6b35]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-[#ff6b35]/8 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-[#ff6b35]/6 rounded-full blur-xl"></div>
          </div>
          
          <div className="w-full max-w-md relative z-10">
            {/* Logo (Mobile) */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <Image
                src="/images/logo.png"
                alt="ANVIL Logo"
                width={140}
                height={140}
              />
            </div>
            
            {/* Main Title */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-sleek-bold text-[var(--text-primary)] mb-4 leading-tight theme-transition">
                {isBuyer ? 'Find Your Next US Manufacturing Partner' : 'Connect with Buyers Seeking US Manufacturing'}
              </h1>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed font-sleek theme-transition">
                {isBuyer 
                  ? 'Connect with verified US manufacturers who deliver quality, reliability, and local support. Skip the endless search and join our waitlist for early access.'
                  : 'Connect with buyers who prioritize quality, reliability, and US manufacturing partnerships. Join our waitlist to be first in line when we launch.'
                }
              </p>
            </div>
            
            {/* Toggle */}
            <div className="mb-8">
              <Toggle onToggle={onToggle} isBuyer={isBuyer} />
            </div>
            
            {/* Form */}
            <WaitlistForm isBuyer={isBuyer} />
          </div>
        </div>
      </div>
    </section>
  );
}
