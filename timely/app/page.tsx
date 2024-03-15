import { SignedInNavBar } from '@/components/signed-in-nav-bar'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/track')
}
