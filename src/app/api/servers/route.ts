import { v4 as uuid4 } from 'uuid'
import { NextResponse } from 'next/server'
import { MemberRole } from '@prisma/client'
import getSession from '@/lib/get-session'
import { db } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json()
    const session = await getSession()
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const server = await db.server.create({
      data: {
        userId: session?.user?.id,
        name,
        imageUrl,
        inviteCode: uuid4(),
        channels: {
          create: [{ name: 'general', userId: session?.user?.id }],
        },
        members: {
          create: [{ userId: session?.user?.id, role: MemberRole.ADMIN }],
        },
      },
    })

    return NextResponse.json(server)
  } catch (error) {
    console.log(error)
    return new NextResponse('Server error', { status: 500 })
  }
}
