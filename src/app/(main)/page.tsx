import { InitialModal } from '@/components/modals/initial-modal'
import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          userId: session?.user.id,
        },
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal />
}
