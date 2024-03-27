import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function pad (n: number) {
  return n.toString().padStart(2, '0')
}

export const getInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ")
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
}