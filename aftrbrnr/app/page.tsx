import { SignedInNavBar } from '@/components/signed-in-nav-bar'
import { getUserSession } from '@/lib/auth';
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getUserSession();

  if (session) {
    redirect('/track');
  } else {
    redirect('/home');
  }
}

