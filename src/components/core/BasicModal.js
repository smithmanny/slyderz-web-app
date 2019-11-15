import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

import { withStyles } from './index';
import basicModalStyles from '../../assets/styles/shared/basicModalStyles';

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const BasicModal = ({ classes, children, open, onClose, ...props }) => {
  const [modalStyle] = React.useState(getModalStyle);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
      {...props}
    >
      <div style={modalStyle} className={classes.paper}>
        {children}
      </div>
    </Modal>
  );
};

BasicModal.propTypes = {
  children: PropTypes.arrayOf.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(basicModalStyles)(BasicModal);
