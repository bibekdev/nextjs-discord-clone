import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'
import getSession from '@/lib/get-session'
import { db } from '@/lib/db'

export async function PATCH(
  _req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.serverId) {
      return new NextResponse('Server ID Missing', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        userId: session?.user.id,
      },
      data: {
        inviteCode: uuidv4(),
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
