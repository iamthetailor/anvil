'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface WaitlistFormProps {
  isBuyer: boolean;
}

export default function WaitlistForm({ isBuyer }: WaitlistFormProps) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Reset form when toggle changes
  useEffect(() => {
    setEmail('');
    setCompany('');
    setDetails('');
    setIsSubmitted(false);
    setFocusedField(null);
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [isBuyer]);

  // Client-side validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    if (!email.trim() || !validateEmail(email.trim())) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (!company.trim()) {
      alert('Please enter your company name.');
      return false;
    }
    if (!details.trim()) {
      alert('Please provide details about your manufacturing needs or expertise.');
      return false;
    }
    if (email.length > 254) {
      alert('Email address is too long.');
      return false;
    }
    if (company.length > 200) {
      alert('Company name is too long.');
      return false;
    }
    if (details.length > 1000) {
      alert('Details are too long. Please keep it under 1000 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent rapid submissions
    if (isSubmitting) {
      return;
    }
    
    // Client-side validation
    if (!validateForm()) {
      return;
    }
    
    // Prevent multiple submissions
    setSubmitCount(prev => prev + 1);
    if (submitCount >= 3) {
      alert('Too many submission attempts. Please wait before trying again.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare data for Supabase
      const formData = {
        role: isBuyer ? 'buyer' : 'manufacturer',
        email: email.trim(),
        company: company.trim(),
        expertise_looking_for: details.trim(),
        utm_source: 'website',
        utm_campaign: 'waitlist',
        utm_ad: 'landing_page',
        honeypot: '' // Honeypot field (should always be empty)
      };

      // Send to Supabase
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Successfully submitted to Supabase:', formData);
        
        // Track Meta Lead event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: isBuyer ? 'Buyer Waitlist Signup' : 'Manufacturer Waitlist Signup',
            content_category: 'Waitlist',
            value: 0,
            currency: 'USD'
          });
        }
        
        setIsSubmitted(true);
      } else {
        console.error('Error submitting to Supabase:', result.error);
        alert(result.error || 'There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#1a4d3a] border border-[#00ff88] rounded-xl p-6 text-center glow-green">
        <div className="text-[#00ff88] text-4xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          You're on the list!
        </h3>
        <p className="text-white/80">
          We'll notify you as soon as we launch. Get ready for something amazing!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-300">
      <div>
        <label htmlFor="email" className={`block text-sm font-medium mb-2 theme-transition ${
          theme === 'dark' ? 'text-white' : 'text-gray-700'
        }`}>
          Email address*
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          required
          className={`form-input w-full px-4 py-4 border rounded-lg transition-all duration-200 text-base ${
            theme === 'dark' 
              ? 'bg-transparent placeholder-white/40 text-white' 
              : 'bg-white placeholder-gray-400 text-gray-900'
          } ${
            focusedField === 'email' 
              ? 'border-[#ff6b35] shadow-lg shadow-[#ff6b35]/25' 
              : theme === 'dark' 
                ? 'border-white/20 hover:border-white/40'
                : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder="e.g. andrew@example.com"
        />
      </div>
      
      <div>
        <label htmlFor="company" className={`block text-sm font-medium mb-2 theme-transition ${
          theme === 'dark' ? 'text-white' : 'text-gray-700'
        }`}>
          {isBuyer ? 'Company name*' : 'Manufacturing company*'}
        </label>
        <input
          type="text"
          id="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onFocus={() => setFocusedField('company')}
          onBlur={() => setFocusedField(null)}
          required
          className={`form-input w-full px-4 py-4 border rounded-lg transition-all duration-200 text-base ${
            theme === 'dark' 
              ? 'bg-transparent placeholder-white/40 text-white' 
              : 'bg-white placeholder-gray-400 text-gray-900'
          } ${
            focusedField === 'company' 
              ? 'border-[#ff6b35] shadow-lg shadow-[#ff6b35]/25' 
              : theme === 'dark' 
                ? 'border-white/20 hover:border-white/40'
                : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder={isBuyer ? 'e.g., TechStart Inc.' : 'e.g., Precision Manufacturing Co.'}
        />
      </div>
      
      <div>
        <label htmlFor="details" className={`block text-sm font-medium mb-2 theme-transition ${
          theme === 'dark' ? 'text-white' : 'text-gray-700'
        }`}>
          {isBuyer ? 'What type of manufacturing are you looking for?' : 'Tell us about your expertise'}
        </label>
        <textarea
          id="details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          onFocus={() => setFocusedField('details')}
          onBlur={() => setFocusedField(null)}
          required
          rows={4}
          className={`form-input w-full px-4 py-4 border rounded-lg transition-all duration-200 resize-none text-base ${
            theme === 'dark' 
              ? 'bg-transparent placeholder-white/40 text-white' 
              : 'bg-white placeholder-gray-400 text-gray-900'
          } ${
            focusedField === 'details' 
              ? 'border-[#ff6b35] shadow-lg shadow-[#ff6b35]/25' 
              : theme === 'dark' 
                ? 'border-white/20 hover:border-white/40'
                : 'border-gray-300 hover:border-gray-400'
          }`}
          placeholder={isBuyer 
            ? 'What manufacturing services do you need? (e.g., injection molding, CNC machining, electronics assembly, 3D printing, metal fabrication, etc.)' 
            : 'What are you great at manufacturing? Share your specialties, equipment, materials you work with, or the types of products you excel at creating.'
          }
        />
      </div>
      
      {/* Honeypot field - hidden from users */}
      <input
        type="text"
        name="honeypot"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 px-6 rounded-lg font-sleek transition-all duration-300 mt-8 ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-[#ff6b35] hover:bg-[#e55a2b] text-white'
        }`}
      >
        {isSubmitting 
          ? 'Submitting...' 
          : (isBuyer ? 'Join the Buyer Waitlist' : 'Join the Manufacturer Waitlist')
        }
      </button>
      
      <p className={`text-sm text-center leading-relaxed mt-6 theme-transition ${
        theme === 'dark' ? 'text-white/60' : 'text-gray-600'
      }`}>
        We respect your privacy and will only contact you when ANVIL launches and with early access opportunities. No spam, just valuable updates about our platform.
      </p>
    </form>
  );
}
