'use client'

import {
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
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
    </>
  )
}
export default ModalProvider
