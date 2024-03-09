'use client'

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"

export default function GoogleSignInButton() {
    const loginWithGoogle = () => signIn('google', { callbackUrl: '/track' })

    return (
        <div className='flex justify-center'>
        <Button onClick={loginWithGoogle}>Log In With Google</Button>
    </div>
    )
}