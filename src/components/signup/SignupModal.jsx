import React from "react";

import BasicModal from "../BasicModal";
import SignupModalForm from "./SignupModalForm";

const SignupModal = ({ open, onClose, openLoginModal }) => (
  <BasicModal open={open} onClose={onClose}>
    <SignupModalForm closeModal={onClose} openLoginModal={openLoginModal} />
  </BasicModal>
);

export default SignupModal;
