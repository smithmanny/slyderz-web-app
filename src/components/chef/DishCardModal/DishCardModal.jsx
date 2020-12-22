import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";

import dishCardModalStyles from "./styles";

import Divider from "../../shared/Divider";
import Typography from "../../shared/Typography";
import DishCardModalContent from "../DishCardModalContent";

const DishCardModal = (props) => {
  const classes = dishCardModalStyles();
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
        <DishCardModalContent />
      </MuiDialogContent>
    </Dialog>
  );
};

export default DishCardModal;
