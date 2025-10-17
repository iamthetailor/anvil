'use client';

import React from 'react';

interface CTAProps {
  isBuyer: boolean;
  onToggle: (buyer: boolean) => void;
}

export default function CTA({ isBuyer, onToggle }: CTAProps) {

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Join the <span className="text-gradient-orange">Revolution</span>
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Be among the first to experience the future of manufacturing connections. 
          <span className="text-orange-400 font-medium"> Limited spots available</span> for early access.
        </p>
        
        <div className="max-w-2xl mx-auto mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {isBuyer ? 'Ready to Find Your Perfect Match?' : 'Ready to Grow Your Business?'}
          </h3>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            {isBuyer 
              ? 'Join thousands of buyers who are already on the waitlist. Be first in line when we launch.'
              : 'Join hundreds of manufacturers who are already on the waitlist. Start connecting with buyers today.'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="gradient-orange text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 shadow-lg transform hover:scale-105">
              Join the Waitlist
            </button>
            <button className="border-2 border-gray-300 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="text-white">
            <div className="text-4xl font-bold mb-2 text-gradient-orange">500+</div>
            <div className="text-gray-300">Early Adopters</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2 text-gradient-orange">50+</div>
            <div className="text-gray-300">Manufacturers</div>
          </div>
          <div className="text-white">
            <div className="text-4xl font-bold mb-2 text-gradient-orange">Q1 2024</div>
            <div className="text-gray-300">Launch Date</div>
          </div>
        </div>
      </div>
    </section>
  );
}
