import { type Metadata } from 'next';

import { Layout } from '@/components/Layout';

import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Pierre Spring',
    default: 'Pierre Spring - Full Stack Typescript Developer',
  },
  description:
    "I'm Pierre Spring, a full stack typescript developer with 15 years of experience, based in Zürich, Switzerland.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
