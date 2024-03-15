import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Aftrbrnr Time Tracking',
  description: 'Track your time with Aftrbrnr.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html className="h-full" lang="en">
        {/* <head> */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3806960668646240"
     crossOrigin="anonymous"></script> */}
        {/* </head> */}
        
        <body className={'${inter.className} h-full'}>
            {children}
        </body>
      </html>
  )
}
