import type { Metadata } from 'next'
import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='h-screen'>
      <Image
        src='/discord.svg'
        fill
        alt='discord-background'
        className='-z-10'
      />
      <div className='md:flex items-center justify-center h-full'>
        {children}
      </div>
    </div>
  )
}
