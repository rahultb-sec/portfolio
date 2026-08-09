import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { getSettings } from '@/lib/cms';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return {
    title: {
      default: settings.title,
      template: `%s | ${settings.name}`,
    },
    description: settings.shortBio,
    keywords: [
      'Rahul T B Cybersecurity',
      'Cybersecurity Engineer',
      'Penetration Testing',
      'Android Security',
      'Web Application Security',
      'Vulnerability Research',
    ],
    authors: [{ name: settings.name }],
    creator: settings.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: settings.seo.siteUrl,
      title: settings.title,
      description: settings.shortBio,
      siteName: settings.seo.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.title,
      description: settings.shortBio,
    },
    metadataBase: new URL(settings.seo.siteUrl || 'https://rahulsecur.com'),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    jobTitle: settings.role,
    description: settings.shortBio,
    url: settings.seo.siteUrl,
    sameAs: [
      settings.socials.github,
      settings.socials.linkedin,
      settings.socials.bugcrowd,
      settings.socials.tryhackme,
    ].filter(Boolean),
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
