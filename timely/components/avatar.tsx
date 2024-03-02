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
import { BookOpen, Box, LogOut, PaintBucket, Settings, UserRound } from 'lucide-react'
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
                <a href="/admin/profile">
                    <Settings className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    Profile Settings
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <a href="/admin/team">
                    <UserRound className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    Team
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <a href="/admin/appearance">
                    <PaintBucket className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    Appearance
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <a href="/admin/integrations">
                    <Box className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    Integrations
                </a>
            </DropdownMenuItem>
            <DropdownMenuItem className="w-full cursor-pointer" asChild>
                <a href="/admin/about">
                    <BookOpen className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    About
                </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Logout />
        </DropdownMenuContent>
    </DropdownMenu>
)