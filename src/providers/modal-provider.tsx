'use client'

import {
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
  DeleteMessagModal,
  DeleteServerModal,
  EditChannelModal,
  EditServerModal,
  InvitePeople,
  LeaveServerModal,
} from '@/components/modals'

const ModalProvider = () => {
  return (
    <>
      <CreateServerModal />
      <InvitePeople />
      <CreateChannelModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <EditServerModal />
      <DeleteMessagModal />
    </>
  )
}
export default ModalProvider
