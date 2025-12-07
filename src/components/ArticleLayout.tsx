'use client'

import { useRouter } from 'next/navigation'
import { Prose } from '@/components/Prose'
import { type ArticleWithSlug } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import clsx from 'clsx'

function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BackButton() {
  return (
    <a
      href="../"
      aria-label="Go back to home"
      className={clsx(
        'group absolute -top-1.5 flex h-10 w-10 -translate-x-[250%] items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 max-lg:hidden',
      )}
    >
      <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
    </a>
  )
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug
  children: React.ReactNode
}) {
  let router = useRouter()

  return (
    <div className="mt-16 lg:mt-32">
      <div className="relative">
        <BackButton />
        <article>
          <header className="flex flex-col">
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first flex items-center text-base text-zinc-400"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200" />
              <span className="ml-3">{formatDate(article.date)}</span>
            </time>
          </header>
          <Prose className="mt-8" data-mdx-content>
            {children}
          </Prose>
        </article>
      </div>
    </div>
  )
}
