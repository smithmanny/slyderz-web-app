import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';

import basicModalStyles from '../../assets/styles/shared/basicModalStyles';

const BasicModal = ({ children, ...props }) => {
  const classes = basicModalStyles();
  return (
    <Dialog classes={{ paper: classes.dialog }} {...props}>
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
