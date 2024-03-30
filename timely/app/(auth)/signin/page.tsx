import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import GoogleSignInButton from './GoogleSignInButton'
import placeholder from '../../../public/images/placeholder.png'

export default function SignInPage() {

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login to Aftrbrnr</h1>
          </div>
          <div className="grid gap-4">
            <GoogleSignInButton />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block hmin-h-screen">
        <Image
          src={placeholder}
          alt="Image"
          style={{
            width: 'auto',
            height: 'auto',
          }}
          // width="1920"
          // height="1080"
          className="h-full min-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}