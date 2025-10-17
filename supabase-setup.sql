-- Create the waitlist_submissions table in Supabase
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id BIGSERIAL PRIMARY KEY,
  role TEXT,
  email TEXT NOT NULL,
  company TEXT,
  expertise_looking_for TEXT,
  utm_source TEXT,
  utm_campaign TEXT,
  utm_ad TEXT,
  ip_address TEXT, -- Raw IP for bot detection
  user_agent TEXT, -- Raw user agent for bot detection
  honeypot TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_email ON waitlist_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_created_at ON waitlist_submissions(created_at);

-- Create an index on ip_address for rate limiting and bot detection
CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_ip_address ON waitlist_submissions(ip_address);

-- Create a composite index for duplicate checking
CREATE INDEX IF NOT EXISTS idx_waitlist_submissions_email_created ON waitlist_submissions(email, created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts (for form submissions)
CREATE POLICY "Allow insert for waitlist submissions" ON waitlist_submissions
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reads (you can modify this based on your needs)
CREATE POLICY "Allow read for authenticated users" ON waitlist_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
