import { makeStyles } from "integrations/material-ui";

export default makeStyles((theme) => ({
  container: {
    alignItems: "center",
    flexDirection: 'row',
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

