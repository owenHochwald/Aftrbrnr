import NextAuth from 'next-auth/next'
import { session } from '@/lib/auth'

import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from 'next-auth'
import { options } from './options'





const handler = NextAuth(options)
export { handler as GET, handler as POST }