import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';

import Divider from '../../shared/Divider';
import Typography from '../../shared/Typography';
import ChefItemAddToCart from '../add_to_cart';
import ChefItemCardModalStyles from './styles';

const ChefItemCardModal = ({ ...props }) => {
  const classes = ChefItemCardModalStyles();
  return (
    <Dialog classes={{ paper: classes.dialog }} {...props}>
      <MuiDialogContent className={classes.dialogContent}>
        <img src="/food.jpg" alt="Food" className={classes.image} />
        <div className={classes.content}>
          <Typography className={classes.title} variant="h5" gutterBottom>
            Dish Title Here
          </Typography>
          <Typography paragraph>Dish title description will go here</Typography>
          <Divider />
        </div>
        <ChefItemAddToCart />
      </MuiDialogContent>
    </Dialog>
  );
};

export default ChefItemCardModal;
