# ANVIL - Manufacturing Platform Landing Page

A modern, responsive landing page for ANVIL, a platform connecting buyers with US manufacturers. Built with Next.js, React, and Tailwind CSS.

## Features

- ⚡ **Lightning Fast** - Built with Next.js for optimal performance
- 🔒 **Secure** - Enterprise-grade anti-spam and security features
- 📱 **Mobile First** - Responsive design for all devices
- 🎨 **Beautiful UI** - Modern, clean design with dark/light mode
- 🛡️ **Anti-Spam Protection** - Advanced bot detection and rate limiting
- 📊 **Analytics Ready** - Integrated with Supabase for data collection

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a Next.js app and configure the build settings
4. Your app will be deployed and you'll get a live URL

### Manual Deployment

You can also deploy manually:

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Deployment**: Vercel

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── submit-form/   # Form submission endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Hero.tsx           # Hero section with form
│   ├── Footer.tsx         # Footer component
│   ├── Toggle.tsx         # Buyer/Manufacturer toggle
│   ├── WaitlistForm.tsx   # Form component
│   └── ThemeToggle.tsx    # Dark/Light mode toggle
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Theme management
├── public/                # Static assets
│   └── images/           # Logo and favicon
└── ...config files
```

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

## Database Setup

1. Create a Supabase project
2. Run the following SQL in your Supabase SQL editor:

```sql
CREATE TABLE waitlist_submissions (
  id BIGSERIAL PRIMARY KEY,
  role TEXT,
  email TEXT NOT NULL,
  company TEXT,
  expertise_looking_for TEXT,
  utm_source TEXT,
  utm_campaign TEXT,
  utm_ad TEXT,
  ip_address TEXT,
  user_agent TEXT,
  honeypot TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_waitlist_submissions_email ON waitlist_submissions(email);
CREATE INDEX idx_waitlist_submissions_created_at ON waitlist_submissions(created_at);
CREATE INDEX idx_waitlist_submissions_ip_address ON waitlist_submissions(ip_address);

ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for waitlist submissions" ON waitlist_submissions
  FOR INSERT WITH CHECK (true);
```

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Honeypot Protection**: Hidden fields to catch bots
- **Input Validation**: Email format, field lengths, suspicious patterns
- **Duplicate Prevention**: Same email within 1 hour
- **Anti-Spam**: Content filtering and pattern detection

## License

MIT License - feel free to use this template for your projects!