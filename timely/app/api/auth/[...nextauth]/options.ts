import { NextAuthOptions } from "next-auth"
import { session } from '@/lib/auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID! as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET! as string



export const options : NextAuthOptions = {
    session: {
      strategy: 'jwt',
    },
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    
    callbacks: {
      async signIn({ account, profile }) {
        // If there is an error
        if (!profile?.email) {
          throw new Error('No profile')
        }
        
        // creating user
        const user = await prisma.user.upsert({
          where: {
            email: profile.email,
          },
          create: {
            email: profile.email,
            name: profile.name,
            avatar: (profile as any).picture,
            role: 'OWNER',
            tenant: {
              create: {}
            }
          },
          update: {
            name: profile.name,
            avatar: (profile as any).picture,
          },
        })
  
        return true
      },
  
      session,
  
      async jwt({ token, account, profile, user }) {
        if (profile) {
          const user = await prisma.user.findUnique({
            where: {
              email: profile.email
            },
          })
          if (!user) {
            throw new Error('No user found')
          }
          token.id = user.id
          token.tenant = {
            id: user.tenantId,
          }
        }
        return token
      }
    },
    pages: {
      signIn: '/signin',
    }
  }