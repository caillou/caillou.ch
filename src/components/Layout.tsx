import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

export function PaddedContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl">{children}</div>
    </div>
  )
}

function WhiteBackground() {
  return (
    <div className="fixed flex min-h-full w-full sm:px-8 lg:px-16">
      <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col bg-white ring-1 ring-zinc-100"></div>
    </div>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WhiteBackground />
      <div className="z-0 flex min-h-full w-full flex-col sm:px-8 lg:px-16">
        <div className="flex-grow">
          <PaddedContent>
            <Header />
            {children}
          </PaddedContent>
        </div>
        <Footer />
      </div>
    </>
  )
}
