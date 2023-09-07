import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      fullName: string
      imageUrl: string
      email: string
    }
  }
}
