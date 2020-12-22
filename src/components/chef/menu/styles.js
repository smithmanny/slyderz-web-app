import { makeStyles } from "../../shared/theme";

export default makeStyles((theme) => ({
  addToCartSection: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(1.5),
  },
  content: {
    padding: 0,
  },
  dishInfo: {
    padding: theme.spacing(1),
  },
  dishPicture: {
    backgroundImage: "url('/food.jpg')",
    backgroundSize: "cover",
    borderRadius: theme.spacing(1, 1, 0, 0),
    height: "200px",
    marginBottom: theme.spacing(1),
  },
  item: {
    marginBottom: theme.spacing(2),
    maxWidth: 400,
  },
  title: {
    fontWeight: 500,
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
    paddingBottom: "0 !important",
  },
}));
