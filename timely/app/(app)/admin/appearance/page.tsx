import { Button } from "@/components/ui/button"
import { getUserSession } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"


export default async function AppearancePage() {
    const user = await getUserSession()

    return (
        <div>
            <h1>Appearance</h1>
            <div>Context</div>
        </div>
    )
}