import { makeStyles, createStyles } from "../../libs/material-ui";

export default makeStyles((theme) =>
  createStyles({
    header: {
      backgroundColor: theme.palette.error.light,
      height: "450px",
      margin: theme.spacing(3, 0),
      position: "relative",
    },
    title: {
      color: theme.palette.white.main,
      display: "flex",
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
      textTransform: "uppercase",
    },
  })
);
