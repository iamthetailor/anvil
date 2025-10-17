import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per window
const RATE_LIMIT_BLOCK_DURATION = 60 * 60 * 1000; // 1 hour block

// Rate limiting function
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = ip;
  
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  const data = rateLimitMap.get(key)!;
  
  // Check if window has expired
  if (now > data.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  // Check if limit exceeded
  if (data.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: data.resetTime };
  }
  
  // Increment count
  data.count++;
  rateLimitMap.set(key, data);
  
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - data.count, resetTime: data.resetTime };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  const keysToDelete: string[] = [];
  
  rateLimitMap.forEach((data, key) => {
    if (now > data.resetTime + RATE_LIMIT_BLOCK_DURATION) {
      keysToDelete.push(key);
    }
  });
  
  keysToDelete.forEach(key => rateLimitMap.delete(key));
}, 5 * 60 * 1000); // Clean every 5 minutes

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');
    
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }
    
    // Check request size limit (1MB)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Request too large' },
        { status: 413 }
      );
    }
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
    console.log('Supabase Key:', supabaseKey ? 'Set' : 'Not set');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Parse body with timeout
    const body = await Promise.race([
      request.json(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 5000))
    ]) as any;
    
    console.log('Received data:', body);
    
    // Comprehensive validation
    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for honeypot field (should be empty)
    if (body.honeypot && body.honeypot.trim() !== '') {
      console.log(`Honeypot triggered for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Validate field lengths
    const email = body.email.trim();
    const company = (body.company || '').trim();
    const details = (body.expertise_looking_for || '').trim();

    if (email.length > 254) {
      return NextResponse.json(
        { success: false, error: 'Email too long' },
        { status: 400 }
      );
    }

    if (company.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Company name too long' },
        { status: 400 }
      );
    }

    if (details.length > 1000) {
      return NextResponse.json(
        { success: false, error: 'Details too long' },
        { status: 400 }
      );
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /(.)\1{4,}/, // Repeated characters
      /[<>]/g, // HTML tags
      /javascript:/gi, // JavaScript
      /on\w+\s*=/gi, // Event handlers
    ];

    const allText = `${email} ${company} ${details}`;
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(allText)) {
        console.log(`Suspicious pattern detected for IP: ${ip}`);
        return NextResponse.json(
          { success: false, error: 'Invalid content detected' },
          { status: 400 }
        );
      }
    }

    // Check for duplicate email submissions in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentSubmissions, error: duplicateError } = await supabase
      .from('waitlist_submissions')
      .select('email')
      .eq('email', email)
      .gte('created_at', oneHourAgo);

    if (duplicateError) {
      console.error('Error checking duplicates:', duplicateError);
    } else if (recentSubmissions && recentSubmissions.length > 0) {
      console.log(`Duplicate submission attempt for email: ${email}`);
      return NextResponse.json(
        { success: false, error: 'You have already submitted recently. Please wait before submitting again.' },
        { status: 429 }
      );
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('waitlist_submissions')
      .insert([
        {
          role: body.role || '',
          email: email,
          company: company,
          expertise_looking_for: details,
          utm_source: body.utm_source || '',
          utm_campaign: body.utm_campaign || '',
          utm_ad: body.utm_ad || '',
          ip_address: ip,
          user_agent: request.headers.get('user-agent') || '',
          honeypot: body.honeypot || ''
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Successfully inserted data:', data);
    return NextResponse.json({
      success: true,
      message: 'Data saved successfully',
      data: data[0]
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
