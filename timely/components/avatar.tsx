'user client'

import { Session } from 'next-auth'
import { Avatar as RootAvatar, AvatarImage, AvatarFallback } from './ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Logout } from './logout'


export const Avatar = ({ user }: { user: Session['user'] }) => (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <RootAvatar>
                {user.image && <AvatarImage src={user.image} referrerPolicy='no-referrer' />}
                {!user.image && <AvatarFallback>{user.name}</AvatarFallback>}
            </RootAvatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <div className='space-y-0.5'>
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuLabel className='text-xs font-extralight'>{user.email}</DropdownMenuLabel>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <Link href="/admin/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <Link href="/admin/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <Link href="/admin/about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Logout/>
        </DropdownMenuContent>
    </DropdownMenu>
)