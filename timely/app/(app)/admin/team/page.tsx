import { Button } from "@/components/ui/button"
import { getUserSession } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"


export default async function TeamPage() {
    const user = await getUserSession()

    return (
        <div>
            <h1>Team</h1>
            <div>Context</div>
        </div>
    )
}