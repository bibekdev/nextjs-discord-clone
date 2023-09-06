import { createUploadthing, type FileRouter } from 'uploadthing/next'
import getSession from '@/lib/get-session'

const f = createUploadthing()

const handleAuth = async () => {
  const session = await getSession()
  if (!session?.user) throw new Error('Unauthorized')
  return { userId: session?.user?.id }
}

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(['image', 'pdf'])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  userImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
