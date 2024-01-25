import { prisma } from '@/lib/prisma'
import { session } from '@/lib/auth'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'



const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

const authOption: NextAuthOptions = {
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
  }
  
  const handler = NextAuth(authOption)
  export { handler as GET, handler as POST }