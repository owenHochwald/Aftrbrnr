import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getUserSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"


export default async function ProfilePage() {
    const user = await getUserSession()
    return (
        <div
        //  className="bg-muted/40 bg-slate-100"
        >
            <h1 className='text-2xl font-semibold mb-8'>Profile Settings</h1>
            <span className="block" />
            <div className="grid gap-6 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-col p-4 md:gap-8 md:p-10">
                <Card>
                    <CardHeader>
                        <CardTitle>User Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* turn this form into a client component later */}
                        <form className="grid grid-cols-2">
                            <div className="grid w-full max-w-sm items-center gap-3 py-4 ">
                                <Label htmlFor="email">Name</Label>
                                <Input type="email" id="email" placeholder={user.name || ''} />
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder={user.email || ''} />
                            </div>
                            <div className="flex flex-col items-center gap-3 py-1">
                                <Label htmlFor="email">Picture</Label>
                                <div className="flex flex-col items-center gap-1.5">
                                    <Image alt="Profile picture" src={user.image || ''} width={100} height={100} className="rounded-full" />
                                    <Button className="w-auto">
                                        <Link href={"https://myaccount.google.com/personal-info?"}>Edit on Google</Link>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button formAction="submit">Update profile</Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Creation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="flex flex-col gap-4">
                            <Input
                                placeholder="Project Name"
                                defaultValue="/content/plugins"
                            />
                            <div className="flex items-center space-x-2">
                                <Checkbox id="include" defaultChecked />
                                <label
                                    htmlFor="include"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Allow administrators to change the directory.
                                </label>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}