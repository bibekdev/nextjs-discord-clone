import { MemberRole } from '@prisma/client'
import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const session = await getSession()
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get('serverId')

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 })
    }

    if (!params.channelId) {
      return new NextResponse('Channel ID missing', { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: session.user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: 'general',
            },
          },
        },
      },
    })
    return NextResponse.json(server)
  } catch (error) {
    console.log('[CHANNEL_ID_DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
