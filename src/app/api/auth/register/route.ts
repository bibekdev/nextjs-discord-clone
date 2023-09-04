import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import * as argon2 from 'argon2'

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json()

    if (!fullName || !email || !password) {
      return new NextResponse('All fields required', { status: 400 })
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return new NextResponse('User already exists', { status: 400 })
    }

    const hashedPassword = await argon2.hash(password)

    await db.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
      },
    })

    return new NextResponse('User created successfully', { status: 201 })
  } catch (error) {
    console.log(error)
  }
}
