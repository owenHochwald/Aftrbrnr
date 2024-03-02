import { Button } from "@/components/ui/button"
import { getUserSession } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"


export default async function ProfilePage() {
    const user = await getUserSession()

    return (
        <div>
            <h1 className='text-2xl font-medium mb-8'>Profile</h1>
            <span className="block" />
            <div className="flex">
                <div className="flex-grow flex-col flex gap-3">
                    <h1 className="text-xl font-medium">Details</h1>
                    <div>
                        <div className="font-semibold">Name</div>
                        <div>{user.name}</div>
                    </div>
                    <div>
                        <div className="font-semibold">Email</div>
                        <div>{user.email}</div>
                    </div>
                    <div>
                        <Button>
                            <Link href={"https://myaccount.google.com/personal-info?"}>Edit on Google</Link>
                        </Button>
                    </div>
                </div>
                <div className="w-1/5">
                    <h1 className="text-md font-medium mb-2">Picture</h1>
                    <Image alt="Profile picture" src={user.image} width={100} height={100} className="rounded-full" />
                    <span className="text-neutral-600">
                        <a href="https://myaccount.google.com/personal-info?hl=en" target="_blank"> Edit profile picture on Google here.</a>
                    </span>
                </div>
            </div>
        </div>
    )
}