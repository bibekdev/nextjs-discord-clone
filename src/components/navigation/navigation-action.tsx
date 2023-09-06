'use client'
import { Plus } from 'lucide-react'
import { useModal } from '@/hooks/use-modal'
import ActionTooltip from '../common/action-tooltip'
import { Button } from '../ui/button'

export default function NavigationAction() {
  const { onOpen } = useModal()

  return (
    <div>
      <ActionTooltip side='right' align='center' label='Add a server'>
        <Button
          onClick={() => onOpen('createServer')}
          className='bg-[#313239] rounded-full w-[50px] h-[50px] group hover:bg-[#249654] transition'>
          <Plus className='text-[#249654] group-hover:text-white' size='24' />
        </Button>
      </ActionTooltip>
    </div>
  )
}
