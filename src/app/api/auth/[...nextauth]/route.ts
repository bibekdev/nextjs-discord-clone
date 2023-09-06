import * as argon from 'argon2'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        })

        if (!user) {
          throw new Error('Invalid credentials')
        }

        const matched = await argon.verify(user.password, credentials.password)
        if (!matched) {
          throw new Error('Invalid credentials')
        }
        return user
      },
    }),
  ],
  debug: process.env.NODE_ENV !== 'production',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      const user = await db.user.findUnique({
        where: { id: token.sub },
        select: { id: true, fullName: true, email: true, imageUrl: true },
      })
      session.user = user as any
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
