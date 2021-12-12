import { makeStyles } from "integrations/material-ui";

export default makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    flex: 1,
  },
  dishDescription: {
    flex: 1
  },
  dishPicture: {
    [theme.breakpoints.down('md')]: {
      height: 200,
      width: '100%'
    },
    backgroundSize: "cover",
    borderRadius: theme.spacing(1, 1, 0, 0),
    width: 200,
    marginBottom: theme.spacing(1),
  },
  item: {
    marginBottom: theme.spacing(2),
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: 500,
  },
  orderButton: {
    marginLeft: "auto"
  },
  price: {
    "& span": {
      color: theme.palette.text.secondary,
    },
    fontWeight: 400,
    justifyContent: "flex-end",
  },
  link: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
  },
  root: {
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      maxWidth: 350,
      margin: 'auto',
      height: 'auto'
    },
    display: 'flex',
    minHeight: 200
  },
}));
