import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'app/core/components/shared/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = ({ actions, children, size, title, show, closeModal }) => {
  return (
    <Dialog
      open={show}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      fullWidth={true}
      maxWidth={size}
      scroll="paper"
    >
      {title && <DialogTitle id="modal-title">{title}</DialogTitle>}
      <DialogContent>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  )
}

Modal.defaultProps = {
  actions: null,
  size: 'sm',
  title: ''
}

Modal.propTypes = {
  actions: PropTypes.element,
  closeModal: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  show: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

export default Modal;