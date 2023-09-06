'use client'

import qs from 'query-string'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '../ui/dialog'
import { useModal } from '@/hooks/use-modal'
import { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'

interface Props {}

const DeleteChannelModal: React.FC<Props> = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { channel, server },
  } = useModal()
  const router = useRouter()
  const isModalOpen = isOpen && type === 'deleteChannel'
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: { serverId: server?.id },
      })
      await axios.delete(url)
      onClose()
      router.refresh()
      router.push(`/servers/${server?.id}`)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='font-semibold text-xl'>
          Delete Channel
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. This will permanently delete #
          {channel?.name} channel
        </DialogDescription>
        <DialogFooter>
          <Button variant='destructive' onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant='primary' onClick={onClick} disabled={isLoading}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default DeleteChannelModal
