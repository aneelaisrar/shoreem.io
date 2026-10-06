import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Shoreem.io - Create Smarter. Grow Faster.',
  description: 'Create Smarter. Grow Faster. The global AI SaaS studio for viral captions, reel scripts, hashtags, 30-day planners, and multilingual marketing.',
  openGraph: {
    title: 'Shoreem.io - Create Smarter. Grow Faster.',
    description: 'Create Smarter. Grow Faster. The global AI SaaS studio for viral captions, reel scripts, hashtags, 30-day planners, and multilingual marketing.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shoreem.io - Create Smarter. Grow Faster.',
    description: 'The global AI studio empowering creators and brands with captions, reel scripts, hashtags, content calendars, and marketing tools.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;600;700&family=Noto+Nastaliq+Urdu:wght@400;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
