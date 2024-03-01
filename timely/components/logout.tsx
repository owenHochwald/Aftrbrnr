'use client'

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "next-auth/react"

export const Logout = () => (
    <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => signOut()}>
        <LogOut className="w-3 h-3 mr-2" />
        <span>Log out</span>
    </DropdownMenuItem>
)