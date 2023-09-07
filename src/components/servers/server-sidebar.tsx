import { redirect } from 'next/navigation'
import { ChannelType, MemberRole } from '@prisma/client'

import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import ServerHeader from './server-header'
import { ScrollArea } from '../ui/scroll-area'
import {
  Hash,
  LogOut,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Trash,
  Video,
} from 'lucide-react'
import ServerSearch from './server-search'
import { Separator } from '../ui/separator'
import ServerSection from './server-section'
import ServerChannel from './server-channel'
import Image from 'next/image'
import ServerUser from './server-user'

type ServerSidebarProps = {
  serverId: string
}

const iconMap = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
  [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
  [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4' />,
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='h-4 w-4 mr-2 text-rose-500' />,
}

const ServerSidebar: React.FC<ServerSidebarProps> = async ({ serverId }) => {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: { createdAt: 'asc' },
      },
      members: { include: { user: true }, orderBy: { role: 'asc' } },
    },
  })

  if (!server) {
    redirect('/')
  }

  const textChannels = server?.channels.filter(
    channel => channel.type === ChannelType.TEXT
  )
  const audioChannels = server?.channels.filter(
    channel => channel.type === ChannelType.AUDIO
  )
  const videoChannels = server?.channels.filter(
    channel => channel.type === ChannelType.VIDEO
  )
  const members = server?.members.filter(
    member => member.userId !== session?.user.id
  )

  const role = server.members.find(
    member => member.userId === session?.user.id
  )?.role

  return (
    <div className='flex flex-col h-full text-primary w-full bg-[#2B2C30]'>
      <ServerHeader server={server} role={role} />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: 'Text Channels',
                type: 'channel',
                data: textChannels?.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Voice Channels',
                type: 'channel',
                data: audioChannels?.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Video Channels',
                type: 'channel',
                data: videoChannels?.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: 'Members',
                type: 'member',
                data: members?.map(member => ({
                  id: member.id,
                  name: member.user.fullName,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className='bg-zinc-700 rounded-md my-2' />
        {!!textChannels?.length && (
          <div className='mb-2'>
            <ServerSection
              sectionType='channels'
              channelType={ChannelType.TEXT}
              role={role}
              label='Text Channels'
            />
            <div className='space-y-[2px]'>
              {textChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className='mb-2'>
            <ServerSection
              sectionType='channels'
              channelType={ChannelType.AUDIO}
              role={role}
              label='Voice Channels'
            />
            <div className='space-y-[2px]'>
              {audioChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className='mb-2'>
            <ServerSection
              sectionType='channels'
              channelType={ChannelType.VIDEO}
              role={role}
              label='Video Channels'
            />
            <div className='space-y-[2px]'>
              {videoChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
      <ServerUser />
    </div>
  )
}
export default ServerSidebar
