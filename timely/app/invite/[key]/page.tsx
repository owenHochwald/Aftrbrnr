// import { getUserSession } from "@/lib/auth"
// import { prisma } from "@/lib/prisma"

// export default async function AcceptInvitePage() {
//     const user = await getUserSession()
//     const tenant = await prisma.tenant.findUnique({
//         where: {
//             id: user.tenant.id
//         }
//     })

//     return (
//         // <div>
//         //     <h1>Accept Invite</h1>
//         // </div>
//         <main>
//             <h1>Accept Invite</h1>

//         </main>
//     )
// }


import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AcceptInvitePage({
  params
}: {
  params: { key: string }
}) {
  async function accept() {
    'use server'
    cookies().set('invite_key', params.key)
    redirect('/signin')
  }

  const tenant = await prisma.tenant.findUnique({
    where: {
      inviteKey: params.key
    }
  })

  return (
    <main className="mx-auto max-w-lg mt-8 space-y-8">
      <h1>Accept Invite to &quot;{tenant?.name || '(Not Named)'}&quot;</h1>
      <form action={accept}>
        <Button className="w-full" type="submit">
          Accept
        </Button>
      </form>
    </main>
  )
}