'use client'

import { ServerWithMembersWithProfiles } from '@/types'
import { MemberRole, ChannelType } from '@prisma/client'
import ActionTooltip from '../common/action-tooltip'
import { useModal } from '@/hooks/use-modal'
import { Plus, Settings } from 'lucide-react'

type ServerSectionProps = {
  label: string
  role?: MemberRole
  sectionType: 'channels' | 'members'
  channelType?: ChannelType
  server?: ServerWithMembersWithProfiles
}

const ServerSection: React.FC<ServerSectionProps> = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}) => {
  const { onOpen } = useModal()
  return (
    <div className='flex items-center justify-between py-2'>
      <p className='text-xs uppercase text-zinc-400 font-semibold'>{label}</p>
      {role !== MemberRole.GUEST && sectionType === 'channels' && (
        <ActionTooltip label='Create Channel' side='top'>
          <button
            onClick={() => onOpen('createChannel', { channelType })}
            className='text-zinc-400 hover:text-zinc-300 transition'>
            <Plus className='h-4 w-4' />
          </button>
        </ActionTooltip>
      )}
      {role === MemberRole.ADMIN && sectionType === 'members' && (
        <ActionTooltip label='Manage Members' side='top'>
          <button className='hover:text-zinc-300 text-zinc-400 transition'>
            <Settings className='h-4 w-4' />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
export default ServerSection
