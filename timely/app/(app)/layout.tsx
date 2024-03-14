import { SignedInNavBar } from "@/components/signed-in-nav-bar"
import { Providers } from "../providers"


export default function AppLayout({children }: { children: React.ReactNode }) {
    return (
        <>
        <Providers>
        <SignedInNavBar />
            <main className='h-full'>{children}</main>
        </Providers>

        </>
    )
  }