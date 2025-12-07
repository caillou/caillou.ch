import { Button } from '@/components/Button'

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center pt-16 sm:pt-32">
      <p className="text-base font-semibold text-zinc-400">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 text-base text-zinc-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Button href="/" variant="secondary" className="mt-4">
        Go back home
      </Button>
    </div>
  )
}
