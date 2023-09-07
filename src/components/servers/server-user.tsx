'use client'

import { LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'

const ServerUser = () => {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div className='bg-[#222429] flex p-2 gap-x-3 items-center'>
      <div className='w-[48px] h-[48px] relative'>
        <Image src={session?.user.imageUrl as string} fill alt='profile' />
      </div>
      <div>
        <p className='text-[#BBBDC1] text-base'>{session?.user.fullName}</p>
        <p className='text-white text-xs'>{session?.user.email}</p>
      </div>
      <div className='ml-auto'>
        <LogOut
          className='w-5 h-5 text-white cursor-pointer'
          onClick={() => signOut()}
        />
      </div>
    </div>
  )
}
export default ServerUser
