'use client'

import { useModal } from '@/hooks/use-modal'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { useOrigin } from '@/hooks/use-origin'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { RefreshCw } from 'lucide-react'
import axios from 'axios'

type InvitePeopleProps = {}

const InvitePeople: React.FC<InvitePeopleProps> = () => {
  const [copied, setCopied] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    onOpen,
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal()
  const origin = useOrigin()
  const isModalOpen = isOpen && type === 'invite'

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const generateNewLink = async () => {
    try {
      setLoading(true)
      const { data } = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      )
      onOpen('invite', { server: data })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-[#303339] text-[#F3F2F5]'>
        <DialogHeader className='pt-4'>
          <DialogTitle className='text-base'>
            Invite friends to {server?.name}
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='uppercase text-xs font-bold text-secondary/70'>
            Server invite link
          </Label>
          <div className='flex items-center mt-2 gap-x-2'>
            <Input value={inviteUrl} className='' />
            <Button
              disabled={loading}
              onClick={onCopy}
              className={cn(
                copied
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-indigo-500 hover:bg-indigo-600'
              )}>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <Button
            onClick={generateNewLink}
            disabled={loading}
            variant='link'
            size='sm'
            className='text-xs text-zinc-300 mt-4'>
            Generate a new link
            <RefreshCw className='w-4 h-4 ml-2' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default InvitePeople
