import Link from 'next/link';

import { PaddedContent } from '@/components/Layout';

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="transition hover:text-teal-500">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <div className="border-t border-zinc-100 pt-10 pb-16">
        <PaddedContent>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-sm font-medium text-zinc-800">
              <NavLink href="/about">About</NavLink>
            </div>
            <p className="text-sm text-zinc-400">
              &copy; {new Date().getFullYear()} Pierre Spring. All rights
              reserved.
            </p>
          </div>
        </PaddedContent>
      </div>
    </footer>
  );
}
