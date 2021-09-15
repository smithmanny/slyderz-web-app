import { makeStyles } from "integrations/material-ui";

export default makeStyles((theme) => ({
    button: {
      [theme.breakpoints.up("md")]: {
        marginTop: "0",
      },
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
    container: {
      [theme.breakpoints.up("md")]: {
        flexDirection: "row-reverse",
      },
      flexDirection: "row",
    },
    divider: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    emailAddress: {
      flex: 1,
      margin: `${theme.spacing(0, 2, 0, 0)} !important`,
    },
    footer: {
      backgroundColor: theme.palette.primary.dark,
      marginTop: theme.spacing(4),
      padding: theme.spacing(6, 0),
    },
    newsletterPaper: {
      [theme.breakpoints.up("md")]: {
        marginLeft: "auto",
      },
      maxWidth: "500px",
      padding: theme.spacing(3),
    },
    signup: {
      [theme.breakpoints.up("md")]: {
        flexDirection: 'row'
      },
      display: "flex",
      flexDirection: 'column'
    },
    socialContainer: {
      "& span": {
        marginLeft: "auto",
      },
      "& h6": {
        fontSize: "16px",
      },
      alignItems: "center",
      display: "flex",
      color: "white",
      marginTop: theme.spacing(2),
    },
    socialList: {
      "& a": {
        color: "rgba(255, 255, 255, 0.2)",
      },
      "& a:hover": {
        color: "rgba(255, 255, 255, 0.7)",
        cursor: "pointer",
      },
      "& li": {
        "& svg": {
          fontSize: "32px",
        },
        marginRight: theme.spacing(3),
      },
      display: "flex",
      listStyle: "none",
    },
    table: {
      "& a:hover": {
        cursor: "pointer",
        textDecoration: "underline",
      },
      "& th": {
        textTransform: "uppercase",
        "& h6": {
          fontSize: "14px",
        },
      },
      "& tr": {
        display: "flex",
        fontWeight: 500,
        marginBottom: theme.spacing(2),
        justifyContent: "space-between",
      },
      color: "white",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
      width: "100%",
    },
    text: {
      marginBottom: theme.spacing(3),
    },
  })
);
