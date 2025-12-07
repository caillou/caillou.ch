'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import avatarImage from '@/images/avatar.jpg'

function NavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          'hover:text-teal-500',
        )}
      >
        {children}
      </Link>
    </li>
  )
}

function DesktopNavigation() {
  return (
    <nav>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm">
        <NavItem href="/">Home</NavItem>
      </ul>
    </nav>
  )
}

function Avatar({
  large = false,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href'> & {
  large?: boolean
}) {
  return (
    <Link href="/" aria-label="Home" {...props}>
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full object-cover',
          large ? 'h-16 w-16' : 'h-10 w-10',
        )}
        priority
      />
    </Link>
  )
}

export function Header() {
  let isHomePage = usePathname() === '/'

  return (
    <>
      <header className="mt-10 mb-9">
        {isHomePage && (
          // <Container className="mt-10">
          // <div className="mx-auto max-w-2xl">
          <Avatar large />
          // </div>
          // </Container>
        )}
        {!isHomePage && (
          // todo remove container
          // <Container>
          <div className="flex justify-between">
            <Avatar />
            <DesktopNavigation />
          </div>
          // </Container>
        )}
      </header>
    </>
  )
}
