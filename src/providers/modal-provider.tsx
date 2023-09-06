'use client'

import CreateChannelModal from '@/components/modals/create-channel-modal'
import CreateServerModal from '@/components/modals/create-server-modal'
import DeleteChannelModal from '@/components/modals/delete-channel-modal'
import InvitePeople from '@/components/modals/invite-people'

const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <InvitePeople />
      <CreateChannelModal />
      <DeleteChannelModal />
    </>
  )
}
export default ModalProvider
