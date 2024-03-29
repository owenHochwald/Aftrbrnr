'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function GoogleSignInButton() {
    const loginWithGoogle = () => signIn('google', { callbackUrl: '/track' })

    return (
        <div className='flex justify-center w-full'>
        <Button variant={'outline'} className='w-full' onClick={loginWithGoogle}>Login with Google</Button>
    </div>
    )
}