'use client'

import {
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
  DeleteServerModal,
  EditChannelModal,
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
    </>
  )
}
export default ModalProvider
