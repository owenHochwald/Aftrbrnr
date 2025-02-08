'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Props = {
    href: string
    label: string
}

export const SidebarListItem = ({ href, label }: Props) => {
    const pathName = usePathname()
    return (
        <li key={href}>
            <Link className={cn("w-full block hover:bg-neutral-100 rounded-md p-2", {
                "bg-neutral-100": href.startsWith(pathName)
            })} href={href}>
                {label}
            </Link>
        </li>
    )
}