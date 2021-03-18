import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import { makeStyles, createStyles } from "../libs/material-ui";

const styles = makeStyles((theme) =>
  createStyles({
    dialog: {
      margin: theme.spacing(1),
    },
    dialogContent: {
      padding: 0,
      "&:first-child": {
        paddingTop: 0,
      },
      "& img": {
        objectFit: "cover",
      },
    },
    content: {
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(1),
      },
      padding: theme.spacing(2),
    },
    instructions: {
      padding: theme.spacing(2),
    },
    title: {
      fontWeight: "bold",
    },
  })
);

const BasicModal = ({ children, title, ...props }) => {
  const classes = styles();
  return (
    <Dialog classes={{ paper: classes.dialog }} {...props}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <MuiDialogContent className={classes.dialogContent}>
        <div className={classes.content}>{children}</div>
      </MuiDialogContent>
    </Dialog>
  );
};

BasicModal.propTypes = {
  children: PropTypes.shape(),
};

export default BasicModal;
