import { MemberRole } from '@prisma/client'
import { db } from '@/lib/db'
import getSession from '@/lib/get-session'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await getSession()
    const { name, type } = await req.json()
    const { searchParams } = new URL(req.url)

    const serverId = searchParams.get('serverId')

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!serverId) {
      return new NextResponse('Server ID missing', { status: 400 })
    }

    if (name === 'general') {
      return new NextResponse("Name cannot be 'general'", { status: 400 })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: session?.user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            userId: session?.user.id,
            name,
            type,
          },
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log('CHANNELS_POST', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
