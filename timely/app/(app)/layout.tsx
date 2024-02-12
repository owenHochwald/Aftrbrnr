import { NavBar } from "@/components/nav-bar"

export default function AppLayout({children }: { children: React.ReactNode }) {
    return (
        <>
        <NavBar />
            <main>{children}</main>
        </>
    )
  }