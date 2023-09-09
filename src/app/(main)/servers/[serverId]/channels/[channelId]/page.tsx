import ChatHeader from '@/components/chats/chat-header'
import ChatInput from '@/components/chats/chat-input'
import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import { redirect } from 'next/navigation'

interface ChannelIdPageProps {
  params: {
    serverId: string
    channelId: string
  }
}

const ChannelPage = async ({ params }: ChannelIdPageProps) => {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId: session.user.id,
    },
  })

  if (!channel || !member) {
    redirect('/')
  }

  return (
    <div className='bg-[#303238] flex flex-col h-full'>
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type='channel'
      />
      <ChatInput />
    </div>
  )
}
export default ChannelPage
