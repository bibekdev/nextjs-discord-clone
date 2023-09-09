import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Menu } from 'lucide-react'
import NavigationSidebar from '../navigation/navigation-sidebar'
import ServerSidebar from '../servers/server-sidebar'

type MobileToggleProps = {
  serverId: string
}

const MobileToggle: React.FC<MobileToggleProps> = ({ serverId }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className='md:hidden'>
          <Menu className='text-white' />
        </button>
      </SheetTrigger>
      <SheetContent side='left' className='p-0 flex gap-0'>
        <div className='w-[72px]'>
          <NavigationSidebar />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  )
}
export default MobileToggle
