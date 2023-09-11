import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'

export const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions)

  return session
}
