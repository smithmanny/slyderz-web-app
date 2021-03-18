import { makeStyles, createStyles } from "../../../libs/material-ui";

export default makeStyles((theme) =>
  createStyles({
    title: {
      fontWeight: 500,
    },
    titleDivProps: {
      display: "inline-block",
    },
    subTitle: {
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(5),
    },
  })
);
