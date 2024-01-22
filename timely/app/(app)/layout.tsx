import { NavBar } from "@/components/nav-bar"

export default function AppLaout({children }: { children: React.ReactNode }) {
    return (
        <>
        <NavBar />
            {children}
        </>
    )
  }