import Image from 'next/image'
import { Separator } from '../ui/separator'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import NavigationAction from './navigation-action'
import { ScrollArea } from '../ui/scroll-area'
import NavigationItem from './navigation-item'

const NavigationSidebar = async () => {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: session?.user.id,
        },
      },
    },
  })

  return (
    <div className='flex flex-col space-y-4 items-center h-full text-primary w-full py-3 bg-[#1E1E23]'>
      <Image
        src='/image.png'
        alt='discord'
        width={50}
        height={50}
        className='text-[#5965F3] bg-white rounded-full cursor-pointer'
      />
      <Separator className='h-[2px] bg-zinc-700 rounded-md w-10 mx-auto' />
      <ScrollArea className='flex-1 w-full'>
        {servers?.map(server => (
          <div className='mb-4' key={server.id}>
            <NavigationItem
              serverId={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <NavigationAction />
    </div>
  )
}
export default NavigationSidebar
