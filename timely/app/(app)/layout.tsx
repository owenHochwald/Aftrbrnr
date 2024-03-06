import { NavBar } from "@/components/nav-bar"
import { Providers } from "../providers"


export default function AppLayout({children }: { children: React.ReactNode }) {
    return (
        <>
        <Providers>
        <NavBar />
            <main className='h-full'>{children}</main>
        </Providers>

        </>
    )
  }