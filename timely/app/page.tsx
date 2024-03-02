import { NavBar } from '@/components/nav-bar'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/track')
}
