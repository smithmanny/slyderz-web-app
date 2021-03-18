import { makeStyles, createStyles } from "../../libs/material-ui";

export default makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    content: {
      flex: 1,
    },
  })
);
