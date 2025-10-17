import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ANVIL - Connect Buyers with US Manufacturers',
  description: 'Join the waitlist for ANVIL, the platform connecting businesses with verified US manufacturers. Find quality manufacturing partners or showcase your manufacturing capabilities.',
  keywords: [
    'manufacturing platform',
    'US manufacturers',
    'manufacturing services',
    'product manufacturing',
    'manufacturing network',
    'industrial manufacturing',
    'custom manufacturing',
    'manufacturing marketplace',
    'buyer manufacturer connection',
    'manufacturing waitlist'
  ],
  authors: [{ name: 'ANVIL Team' }],
  creator: 'ANVIL',
  publisher: 'ANVIL',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.theanvil.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ANVIL - Connect Buyers with US Manufacturers',
    description: 'Join the waitlist for ANVIL, the platform connecting businesses with verified US manufacturers. Find quality manufacturing partners or showcase your manufacturing capabilities.',
    url: 'https://www.theanvil.app',
    siteName: 'ANVIL',
    images: [
      {
        url: '/images/website-meta-link-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ANVIL - Manufacturing Platform connecting buyers with US manufacturers',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANVIL - Connect Buyers with US Manufacturers',
    description: 'Join the waitlist for ANVIL, the platform connecting businesses with verified US manufacturers.',
    images: ['/images/website-meta-link-image.jpg'],
    creator: '@anvil',
    site: '@anvil',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  manifest: '/manifest.json',
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ANVIL",
    "description": "Platform connecting buyers with verified US manufacturers",
    "url": "https://www.theanvil.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "ANVIL"
    },
    "featureList": [
      "Connect with US manufacturers",
      "Find manufacturing partners",
      "Showcase manufacturing capabilities",
      "Verified manufacturer network"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
