import { makeStyles } from 'integrations/material-ui'

export default makeStyles((theme) => ({
  chefAvatar: {
    [theme.breakpoints.up("md")]: {
      position: "relative",
      left: "auto",
      top: "auto",
      transform: "inherit",
    },
    height: `${theme.spacing(10)}px !important`,
    position: "absolute",
    top: 0,
    transform: "translate(-50%, -50%)",
    left: "50%",
    width: `${theme.spacing(10)}px !important`,
  },
  chefAvatarContainer: {
    [theme.breakpoints.up("md")]: {
      height: "auto",
      marginRight: theme.spacing(1),
    },
    height: theme.spacing(8),
  },
  chefIntro: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "transparent",
      border: "none",
      boxShadow: "none",
      padding: 0,
    },
    height: "100%",
    textAlign: "center",
    padding: theme.spacing(2),
    position: "relative",
  },
  chefMainDish: {
    height: "100%",
    width: "100%",
  },
  chefName: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(0),
      textAlign: "left",
    },
  },
  chefRating: {
    [theme.breakpoints.up("md")]: {
      justifyContent: "flex-start",
    },
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(1, 0),
  },
  chefRatingContainer: {
    display: "flex",
    margin: theme.spacing(1, 0, 1, 4.5),
  },
  container: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row-reverse",
    },
    flexDirection: "row",
  },
  description: {
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
    fontSize: "1rem",
    fontWeight: 475,
    textAlign: "center",
  },
  mainContent: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row-reverse",
    },
    marginTop: theme.spacing(6),
  },
  state: {
    [theme.breakpoints.up("md")]: {
      textAlign: "left",
    },
    textTransform: "uppercase",
    marginTop: theme.spacing(3),
    textAlign: "center",
    fontWeight: 475,
  },
}));
