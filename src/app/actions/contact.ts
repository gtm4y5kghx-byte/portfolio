'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactErrors = { name?: string; email?: string; message?: string };

type ContactResult =
  | { success: true }
  | { success: false; errors?: ContactErrors; message?: string };

// --- Validation ---

function validate(
  name: string,
  email: string,
  message: string,
): ContactErrors | null {
  const errors: ContactErrors = {};

  if (!name?.trim()) errors.name = 'Name is required';
  if (!email?.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = 'Invalid email';
  if (!message?.trim()) errors.message = 'Message is required';

  return Object.keys(errors).length > 0 ? errors : null;
}

// --- Honeypot ---

function isBot(formData: FormData): boolean {
  return Boolean(formData.get('company'));
}

// --- Rate limiting ---

const submissions = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 15 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW,
  );
  submissions.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  return false;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  return headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
}

// --- Email ---

async function sendEmail(
  name: string,
  email: string,
  message: string,
): Promise<boolean> {
  const { error } = await resend.emails.send({
    from: 'Portfolio <me@jasenmp.com>',
    to: 'me@jasenmp.com',
    subject: `Portfolio contact from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  if (error) console.log('Resend error:', error);
  return !error;
}

// --- Action ---

export async function submitContact(
  _prevState: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  if (isBot(formData)) return { success: true };

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  const errors = validate(name, email, message);
  if (errors) return { success: false, errors };

  const ip = await getClientIp();
  if (isRateLimited(ip)) {
    return {
      success: false,
      message: 'Too many submissions. Please try again later.',
    };
  }

  const sent = await sendEmail(name, email, message);
  if (!sent) {
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
    };
  }

  return { success: true };
}
