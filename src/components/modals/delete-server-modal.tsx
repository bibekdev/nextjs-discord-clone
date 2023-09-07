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

const DeleteServerModal: React.FC<Props> = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal()
  const router = useRouter()
  const isModalOpen = isOpen && type === 'deleteServer'
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)
      onClose()
      router.refresh()
      router.push(`/`)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='font-semibold text-xl'>
          Delete Server
        </DialogHeader>
        <DialogDescription>
          This action cannot be undone. This will permanently delete{' '}
          {server?.name} server
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
export default DeleteServerModal
