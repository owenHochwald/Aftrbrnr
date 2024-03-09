import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <body className={'${inter.className} h-full'}>
            {children}
        </body>
      </html>
  )
}
