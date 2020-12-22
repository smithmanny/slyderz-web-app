import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { fetcher } from "../../src/utils/utils";
import { makeStyles } from "../../src/components/shared/theme";
import FETCH_ALL_DISHES from "../../src/libs/gql/query/dish/fetchAllDishes";

import ConsumerContainer from "../../src/components/consumerContainer";
import CartSummary from "../../src/components/cartSummary/CartSummary";
import Paper from "../../src/components/shared/Paper";
import { Avatar } from "../../src/components/shared";
import Typography from "../../src/components/shared/Typography";
import Grid from "../../src/components/shared/Grid";
import { StarRateIcon } from "../../src/assets/icons";
import Menu from "../../src/components/chef/menu";

const styles = makeStyles((theme) => ({
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
      padding: theme.spacing(3),
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

export async function getStaticPaths() {
  const paths = [{ params: { cid: "1" } }];
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const dishes = await fetcher(FETCH_ALL_DISHES);
  return { props: { dishes } };
}

const Chef = (props) => {
  const classes = styles();
  const router = useRouter();
  const { cid } = router.query;
  const { data, error } = useSWR(FETCH_ALL_DISHES, fetcher, {
    initialData: props.dishes,
  });
  const dishes = data?.dish || [];
  return (
    <ConsumerContainer>
      <Grid container className={classes.container}>
        <Grid item xs={12} md={4}>
          <img
            alt="Chef header"
            className={classes.chefMainDish}
            srcSet="/detail.jpg"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.chefIntro}>
            <Grid container>
              <Grid className={classes.chefAvatarContainer} item xs={12} md={1}>
                <Avatar
                  alt="Remy Sharp"
                  className={classes.chefAvatar}
                  src="/food.jpg"
                />
              </Grid>
              <Grid item xs={12} md>
                <Typography className={classes.chefName} variant="h1">
                  Shakhor Smith
                </Typography>
                <span className={classes.chefRating}>
                  <StarRateIcon color="primary" />
                  <Typography variant="body1" className="city">
                    4.9 (50 reviews)
                  </Typography>
                </span>
                <Typography variant="body1" className={classes.description}>
                  There was a feature request in my current company, product
                  team requested a table component which should order columns in
                  ascending or descending way when clicking the column’s title.
                  At the end of this post, you’ll see the working POC. There may
                  be so many things to improve in the aspect of code quality but
                  do not forget, this is just a POC. I’m looking forward to your
                  responses to the code.
                </Typography>

                <Typography variant="body1" className={classes.state}>
                  Atlanta, GA
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container className={classes.mainContent}>
        <Grid item xs={12} md={4}>
          <Paper>
            <CartSummary />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Menu dishes={dishes} />
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

export default Chef;
