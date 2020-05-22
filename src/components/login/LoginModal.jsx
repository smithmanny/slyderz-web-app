import React from 'react'

import BasicModal from '../shared/BasicModal';
import LoginModalForm from './LoginModalForm'

const LoginModal = ({ open, onClose, openSignupModal }) => (
  <BasicModal
    open={open}
    onClose={onClose}
  >
    <LoginModalForm 
      closeModal={onClose}
      openSignupModal={openSignupModal}
    />
  </BasicModal> 
)

export default LoginModal