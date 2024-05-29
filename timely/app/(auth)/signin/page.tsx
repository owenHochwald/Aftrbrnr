import Image from 'next/image'
import GoogleSignInButton from './GoogleSignInButton'
import placeholder from '../../../public/images/placeholder.png'
import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function SignInPage() {
  return (
    <div className="flex w-full lg:grid lg:grid-cols-2 min-h-screen md:grid-cols-1">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-1/2 ">
          <Card className="p-5">
            <CardTitle className="text-center">
              <h1 className="text-3xl font-bold">Login or sign up to Aftrbrnr</h1>
            </CardTitle>
            <CardContent className="pt-4">
              <div className="grid gap-8 p-2">
                <GoogleSignInButton />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-screen">
        <Image
          src={placeholder}
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}