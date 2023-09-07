import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { code: string; serverId: string } }
) {
  try {
    const session = await getSession()

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!params.code) {
      return new NextResponse('Invite code Missing', { status: 400 })
    }

    const existingServer = await db.server.findFirst({
      where: {
        inviteCode: params.code,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    })

    if (existingServer) {
      return new NextResponse('Already a member', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        inviteCode: params.code,
      },
      data: {
        members: {
          create: [{ userId: session.user.id }],
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('[SERVER_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
