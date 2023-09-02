import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, fullName, password } = await req.json()

  if (!email || !fullName || !password) {
    return new NextResponse('All fields required', { status: 400 })
  }
}
