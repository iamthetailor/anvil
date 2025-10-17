'use client';

import React from 'react';
import Toggle from './Toggle';

interface FeaturesProps {
  isBuyer: boolean;
  onToggle: (buyer: boolean) => void;
}

export default function Features({ isBuyer, onToggle }: FeaturesProps) {

  const buyerFeatures = [
    {
      icon: '🔍',
      title: 'Smart Matching',
      description: 'AI-powered matching algorithm connects you with manufacturers that fit your exact needs and requirements.'
    },
    {
      icon: '✅',
      title: 'Verified Partners',
      description: 'All manufacturers are thoroughly vetted for quality, reliability, and production capabilities.'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Compare quotes from multiple manufacturers to get the best price for your project.'
    },
    {
      icon: '📊',
      title: 'Real-time Tracking',
      description: 'Monitor your project progress with live updates and transparent communication throughout the process.'
    },
    {
      icon: '🌍',
      title: 'Global Network',
      description: 'Access manufacturers worldwide, from local partners to international production facilities.'
    },
    {
      icon: '🛡️',
      title: 'Secure Transactions',
      description: 'Protected payments and contracts ensure your projects are completed safely and on time.'
    }
  ];

  const manufacturerFeatures = [
    {
      icon: '🎯',
      title: 'Targeted Leads',
      description: 'Get matched with buyers who are specifically looking for your manufacturing capabilities and expertise.'
    },
    {
      icon: '📈',
      title: 'Grow Your Business',
      description: 'Expand your client base and increase revenue by connecting with new buyers in your industry.'
    },
    {
      icon: '💼',
      title: 'Professional Profile',
      description: 'Showcase your capabilities, certifications, and past work to attract the right buyers.'
    },
    {
      icon: '⚡',
      title: 'Quick Responses',
      description: 'Receive instant notifications when buyers are interested in your services.'
    },
    {
      icon: '🤝',
      title: 'Direct Communication',
      description: 'Connect directly with buyers to discuss requirements and build lasting partnerships.'
    },
    {
      icon: '📋',
      title: 'Project Management',
      description: 'Streamlined tools to manage quotes, contracts, and project delivery all in one place.'
    }
  ];

  const features = isBuyer ? buyerFeatures : manufacturerFeatures;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            <span className="font-bold">Designed to Help You</span>
            <br />
            <span className="text-gradient-orange">Do More With Less Stress</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {isBuyer 
              ? 'Our platform is built for modern businesses who want to streamline their manufacturing partnerships and stay in control.'
              : 'Our platform is built for manufacturers who want to grow their business and connect with quality buyers effortlessly.'
            }
          </p>
        </div>
        
        <Toggle onToggle={onToggle} isBuyer={isBuyer} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:from-orange-200 group-hover:to-orange-100 transition-all duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
