import { makeStyles } from "../../../libs/material-ui";

export default makeStyles((theme) => ({
  container: {
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  price: {
    float: "right",
  },
  quantityContainer: {
    alignItems: "center",
    display: "flex",
  },
}));
