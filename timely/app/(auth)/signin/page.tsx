import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import GoogleSignInButton from './GoogleSignInButton'
// import { RegisterForm } from './form'

export default function SignInPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Log Into Aftrbrnr</h1>
        <GoogleSignInButton />
      </div>
    </div>
  )
}