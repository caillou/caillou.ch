import { type Metadata } from 'next'

import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - Frank Spring',
    default:
      'Frank Spring - Loves to build things, explore the universe, and learn new stuff',
  },
  description:
    "I'm Frank Spring, an aspiring software engineer based in the Switzerland. I love to build things, explore the universe, and learn new stuff.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
