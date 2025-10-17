'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [isBuyer, setIsBuyer] = useState(false);

  const handleToggle = (buyer: boolean) => {
    console.log('Page handleToggle called with:', buyer ? 'Buyer' : 'Manufacturer');
    setIsBuyer(buyer);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] theme-transition">
      <ThemeToggle />
      <Hero isBuyer={isBuyer} onToggle={handleToggle} />
      <Footer />
    </main>
  );
}
