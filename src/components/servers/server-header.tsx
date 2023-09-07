'use client'

import { useModal } from '@/hooks/use-modal'
import { Server, MemberRole } from '@prisma/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

type ServerHeaderProps = {
  role?: MemberRole
  server: Server
}

const ServerHeader: React.FC<ServerHeaderProps> = ({ role, server }) => {
  const { onOpen } = useModal()

  const isAdmin = role === MemberRole.ADMIN
  const isModerator = role === MemberRole.MODERATOR
  const bothRole = isAdmin || isModerator

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus:outline-none' asChild>
        <button className='w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-600 border-b-2 hover:bg-zinc-700/10 text-white transition'>
          {server.name}
          <ChevronDown className='h-5 w-5 ml-auto' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 font-medium bg-[#101215] border-none text-[#B0B6BC] space-y-[2px]'>
        {bothRole && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', { server })}
            className='focus:bg-indigo-600 focus:text-white transition px-3 py-2 cursor-pointer'>
            Invite People
            <UserPlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('editServer', { server })}
              className='focus:bg-indigo-600 focus:text-white transition px-3 py-2 cursor-pointer'>
              Edit Server
              <Settings className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('members', { server })}
              className='focus:bg-indigo-600 focus:text-white transition px-3 py-2 cursor-pointer'>
              Manage Users
              <Users className='h-4 w-4 ml-auto' />
            </DropdownMenuItem>
          </>
        )}
        {bothRole && (
          <DropdownMenuItem
            onClick={() => onOpen('createChannel')}
            className='focus:bg-indigo-600 focus:text-white transition px-3 py-2 cursor-pointer'>
            Create Channel
            <PlusCircle className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator className='w-[90%] mx-auto bg-zinc-600' />
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('deleteServer', { server })}
            className='focus:bg-red-500 focus:text-white transition px-3 py-2 cursor-pointer'>
            Delete Server
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('leaveServer', { server })}
            className='focus:bg-red-500 focus:text-white transition px-3 py-2 cursor-pointer'>
            Leave Server
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ServerHeader
