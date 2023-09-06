import ReactQueryProvider from '@/providers/react-query'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import NextAuthProvider from '@/providers/session-provider'
import ModalProvider from '@/providers/modal-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discord',
  description: 'Discord clone by bibekdev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <ModalProvider />
            {children}
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
