import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/lib/app-provider';
import { AuthGuard } from '@/components/shared/auth-guard';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'EstateOS — Real Estate Business Operating System',
  description: 'Complete real estate business management platform for agents and agencies. Leads, properties, matching, deals, commissions, and analytics.',
  openGraph: {
    title: 'EstateOS — Real Estate Business Operating System',
    description: 'Complete real estate business management platform for agents and agencies.',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://bolt.new/static/og_default.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AppProvider><AuthGuard>{children}</AuthGuard></AppProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
