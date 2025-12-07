import Link from 'next/link'

import { GitHubIcon } from '@/components/SocialIcons'
import { AriaRole } from 'react'
import { Card } from '@/components/Card'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import clsx from 'clsx'

function SocialLink({
  icon: Icon,
  text,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string; role?: AriaRole }>
  text: string
}) {
  return (
    <Link {...props}>
      {/* inline-flex can not be on <Link /> due to the prose class */}
      <span className="inline-flex">
        <Icon
          role="presentation"
          className="not-prose inline-block h-5 w-5 self-center fill-current transition"
        />{' '}
        <span className="self-baseline">{text}</span>
      </span>
    </Link>
  )
}

function Paragraph({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p className={clsx('prose mt-6 text-base text-zinc-600', className)}>
      {children}
    </p>
  )
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default async function Home() {
  let articles = await getAllArticles()

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
        Frank Spring
      </h1>
      <Paragraph className="mt-14">
        I’m an aspiring software engineer based in Switzerland. I love to build
        things, explore the universe, and learn new stuff.
      </Paragraph>
      <Paragraph>
        This is my personal website where I share my learning journey. Feel free
        to follow along and reach out if you have any questions or just want to
        say hi.
      </Paragraph>
      <Paragraph>
        You can find the source code for this website and other projects on my{' '}
        <SocialLink
          href="http://github.com/Spring-Frank-EMF/frankspring.ch"
          icon={GitHubIcon}
          text="GitHub account"
        />
        .
      </Paragraph>

      <h2 className="mt-16 text-2xl font-bold tracking-tight text-zinc-800 sm:mt-20 sm:text-3xl">
        Articles
      </h2>

      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
