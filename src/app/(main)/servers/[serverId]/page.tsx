import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import { redirect } from 'next/navigation'

const Page = async ({ params }: { params: { serverId: string } }) => {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }
  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          userId: session?.user.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: 'general',
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  const initialChannel = server?.channels[0]

  if (initialChannel?.name !== 'general') {
    return null
  }

  return redirect(`/servers/${params.serverId}/channels/${initialChannel.id}`)
}
export default Page
