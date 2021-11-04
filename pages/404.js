import Link from "next/link"
import Image from "next/image"
import { Button } from "../components/shared"
import settings from "../settings.json"

const Error404Page = () => {
  return (
    <div className="flex flex-col items-center gap-4 justify-start h-full w-full">
      <h1 className="text-4xl font-semibold z-10">Not found</h1>
      <p className="z-10">We couldn't find what you were looking for.</p>
      <Link href={settings.ROUTES.ROOT} className="z-10">
        <a>
          <Button>Go to homepage</Button>
        </a>
      </Link>
      <Image
        src="/images/illustrations/not-found.png"
        width={500}
        height={500}
        className="opacity-25"
      />
    </div>
  )
}

export default Error404Page
