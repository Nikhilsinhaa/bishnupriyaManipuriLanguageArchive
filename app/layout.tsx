import './globals.css';
import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond, Merriweather } from 'next/font/google';
import { Providers } from './providers';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bmanipuri.org'),
  title: {
    default: 'Bishnupriya Manipuri Language Archive',
    template: '%s | Bishnupriya Manipuri Archive',
  },
  description: 'A digital archive and language preservation center for the Bishnupriya Manipuri language, literature, folklore, and cultural heritage.',
  keywords: ['Bishnupriya Manipuri', 'language preservation', 'linguistics', 'folklore', 'oral history', 'Assam', 'Tripura', 'Manipur', 'Bangladesh'],
  authors: [{ name: 'Bishnupriya Manipuri Language Archive' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Bishnupriya Manipuri Language Archive',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${cormorant.variable} ${merriweather.variable} font-sans antialiased`}
      >
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
