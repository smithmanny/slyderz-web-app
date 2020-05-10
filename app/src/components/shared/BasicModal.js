import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';

import basicModalStyles from '../../assets/styles/shared/basicModalStyles';

const BasicModal = ({ children, title, ...props }) => {
  const classes = basicModalStyles();
  return (
    <Dialog classes={{ paper: classes.dialog }} {...props}>
      {title && (
        <DialogTitle>{title}</DialogTitle>
      )}
      <MuiDialogContent className={classes.dialogContent}>
        <div className={classes.content}>{children}</div>
      </MuiDialogContent>
    </Dialog>
  );
};

BasicModal.propTypes = {
  children: PropTypes.shape()
};

export default BasicModal;
