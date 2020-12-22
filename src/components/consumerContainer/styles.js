import { makeStyles, createStyles } from "../shared/theme";

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
