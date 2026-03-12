import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { getSettings } from '@/lib/sanity/services';
import { urlFor } from '@/lib/sanity/image';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
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
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
