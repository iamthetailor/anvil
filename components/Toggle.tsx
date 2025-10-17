'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ToggleProps {
  onToggle: (isBuyer: boolean) => void;
  isBuyer: boolean;
}

export default function Toggle({ onToggle, isBuyer }: ToggleProps) {
  const { theme } = useTheme();
  
  const handleToggle = (buyer: boolean) => {
    console.log('Toggle clicked:', buyer ? 'Buyer' : 'Manufacturer');
    onToggle(buyer);
  };

  return (
    <div className="flex items-center justify-center mb-8 relative z-20">
      <div className={`backdrop-blur-sm p-1 rounded-2xl flex shadow-2xl ${
        theme === 'dark' 
          ? 'bg-black/20 border border-white/10' 
          : 'bg-white/80 border border-gray-200/50'
      }`}>
        <button
          onClick={() => handleToggle(false)}
          className={`px-10 py-4 rounded-xl font-sleek transition-all duration-500 cursor-pointer text-sm relative overflow-hidden ${
            !isBuyer
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c69] text-white shadow-lg shadow-[#ff6b35]/25'
              : theme === 'dark' 
                ? 'text-white/70 hover:text-white hover:bg-white/5'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
          }`}
        >
          <span className="relative z-10">I'm a Manufacturer</span>
          {!isBuyer && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          )}
        </button>
        <button
          onClick={() => handleToggle(true)}
          className={`px-10 py-4 rounded-xl font-sleek transition-all duration-500 cursor-pointer text-sm relative overflow-hidden ${
            isBuyer
              ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8c69] text-white shadow-lg shadow-[#ff6b35]/25'
              : theme === 'dark' 
                ? 'text-white/70 hover:text-white hover:bg-white/5'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100/50'
          }`}
        >
          <span className="relative z-10">I'm a Buyer</span>
          {isBuyer && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          )}
        </button>
      </div>
    </div>
  );
}
