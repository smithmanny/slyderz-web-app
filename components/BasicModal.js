import React from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  modal: {
    position: 'absolute',
    maxWidth: 568,
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  }
});

const BasicModal = ({ children, classes, open, onClose }) => {
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={onClose}
    >
      <div style={getModalStyle()} className={classes.modal}>
        {children}
      </div>
    </Modal>
  );
};

BasicModal.propTypes = {
  children: PropTypes.PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(BasicModal);
