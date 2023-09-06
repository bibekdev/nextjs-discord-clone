'use client'
import { useParams, useRouter } from 'next/navigation'
import ActionTooltip from '../common/action-tooltip'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type NavigationItemProps = {
  serverId: string
  name: string
  imageUrl: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  serverId,
  name,
  imageUrl,
}) => {
  const router = useRouter()
  const params = useParams()

  const onClick = () => {
    router.push(`/servers/${serverId}`)
  }

  return (
    <ActionTooltip side='right' align='center' label={name}>
      <button onClick={onClick} className='group relative flex items-center'>
        <div
          className={cn(
            'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
            params?.serverId !== serverId && 'group-hover:h-[20px]',
            params?.serverId === serverId ? 'h-[36px]' : 'h-[8px]'
          )}
        />
        <div
          className={cn(
            'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
            params?.serverId === serverId &&
              'bg-primary/10 text-primary rounded-[16px]'
          )}>
          <Image fill src={imageUrl} alt='Channel' />
        </div>
      </button>
    </ActionTooltip>
  )
}
export default NavigationItem
