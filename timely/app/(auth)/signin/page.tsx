import Image from 'next/image'
import GoogleSignInButton from './GoogleSignInButton'
// import placeholder from '../../../public/images/signin-page-content/placeholder.png'
// import placeholder from '../../../public/images/placeholder.png'
import placeholder from './placeholder.jpg'

import { Card, CardContent, CardTitle } from '@/components/ui/card'

export default function SignInPage() {
    return (
        <div className=''>
            <div className="relative mx-auto">
                <Image
                    src={placeholder}
                    alt="Aftrbrnr Hero Image"
                    className="h-screen w-full object-cover"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto shadow">
                    <Card className="p-16">
                        <CardTitle className="text-center">
                            <h1 className="text-3xl font-bold">Login or sign up</h1>
                        </CardTitle>
                        <CardContent className="pt-10">
                            <div className="grid gap-8 p-2">
                                <GoogleSignInButton />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}