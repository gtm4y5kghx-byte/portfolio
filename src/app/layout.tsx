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
    metadataBase: new URL('https://www.jasenmp.com'),
    title: settings?.siteTitle ?? 'Portfolio',
    description: settings?.seoDescription,
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      siteName: settings?.siteTitle ?? 'Portfolio',
      ...(settings?.seoImage
        ? { images: [{ url: urlFor(settings.seoImage).url() }] }
        : {}),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
  project,
}: Readonly<{ children: React.ReactNode; project: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body>
        {children}
        {project}
      </body>
    </html>
  );
}
