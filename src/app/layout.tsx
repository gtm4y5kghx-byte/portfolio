import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { getSettings } from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.siteTitle ?? 'Portfolio',
    description: settings?.seoDescription,
    openGraph: settings?.seoImage
      ? { images: [{ url: urlFor(settings.seoImage).url() }] }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
