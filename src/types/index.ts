import { User, Server, Member } from '@prisma/client'
import { NextApiResponse } from 'next'
import { Server as NetServer, Socket } from 'net'
import { Server as SocketIOServer } from 'socket.io'

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[]
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
