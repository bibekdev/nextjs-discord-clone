'use client'

import {
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
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
    </>
  )
}
export default ModalProvider
