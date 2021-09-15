import { useRouter } from "blitz"

import styles from 'app/chefs/styles/chefPageStyles'

import Avatar from "app/core/components/shared/Avatar"
import ConsumerContainer from "app/core/components/shared/ConsumerContainer"
import Menu from "app/chefs/components/menu"
import Grid from "app/core/components/shared/Grid"
import Paper from "app/core/components/shared/Paper"
import Typography from "app/core/components/shared/Typography"
import Layout from "app/core/layouts/Layout"
import CartSummary from 'app/core/components/cart/cartSummary'

export const ChefPage = (props) => {
  const classes = styles();
  const router = useRouter();
  const { cid } = router.query;
  // const { loading, error, data } = useQuery(FETCH_ALL_DISHES);
  // if (loading) return "LOADING";
  // const { dishes } = data;
  const dishes = [
    {
      id: 0,
      name: 'Deep Fried Chipotle Wings',
      description: 'This is the description',
      price: 25
    },
    {
      id: 1,
      name: 'Dish #2',
      description: 'This is the description',
      price: 25
    },
    {
      id: 2,
      name: 'Dish #3',
      description: 'This is the description',
      price: 25
    },
    {
      id: 3,
      name: 'Dish #4',
      description: 'This is the description',
      price: 100
    },
    {
      id: 4,
      name: 'Dish #5',
      description: 'This is the description',
      price: 50
    },
  ]

  return (
    <ConsumerContainer>
      <Paper className={classes.chefIntro}>
        <Grid container>
          <Grid className={classes.chefAvatarContainer} item xs={12} md={1}>
            <Avatar
              alt="Remy Sharp"
              className={classes.chefAvatar}
              src="/logo.png"
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography className={classes.chefName} variant="h1">
              Shakhor Smith
            </Typography>
            <span className={classes.chefRating}>
              {/* <StarRateIcon color="primary" /> */}
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
      <Grid container className={classes.mainContent} spacing={2}>
        <Grid item xs={12} md={5}>
          <Paper>
            <CartSummary buttonText="Checkout" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Menu dishes={dishes} />
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

ChefPage.getLayout = (page) => <Layout title="Chef name">{page}</Layout>

export default ChefPage;
