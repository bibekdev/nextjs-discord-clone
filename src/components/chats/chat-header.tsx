import { Hash } from 'lucide-react'
import React from 'react'
import MobileToggle from '../common/mobile-toggle'
import { UserAvatar } from '../common/user-avatar'

type ChatHeaderProps = {
  serverId: string
  name: string
  type: 'channel' | 'conversation'
  imageUrl?: string
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  serverId,
  name,
  type,
  imageUrl,
}) => {
  return (
    <div className='text-md font-semibold px-3 flex items-center h-12 border-neutral-800 border-b-2'>
      <MobileToggle serverId={serverId} />
      {type === 'channel' ? (
        <Hash className='ml-5 md:ml-0 w-5 h-5 text-zinc-400 mr-2' />
      ) : (
        <UserAvatar src={imageUrl} className='h-8 w-8 md:h-8 md:w-8 mr-2' />
      )}
      <p className='font-semibold text-md text-white'>{name}</p>
    </div>
  )
}
export default ChatHeader
