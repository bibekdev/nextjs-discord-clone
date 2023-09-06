import { User, Server, Member } from '@prisma/client'

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { user: User })[]
}
