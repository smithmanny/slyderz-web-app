import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import StarRateIcon from '@material-ui/icons/StarRate';

import { AppContainer } from '../../src/components/layouts';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  withStyles
} from '../../src/components/core';
import ChefItemCard from '../../src/components/chef/ChefItemCard';

import chefDetailStyles from '../../src/assets/styles/consumer/chef/chefDetailStyles';

const Chef = ({ classes }) => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <AppContainer>
      <Grid container className={classes.header}>
        <img srcSet="/static/detail.jpg" alt="Chef header" />
      </Grid>

      <Grid container>
        <Grid item className={classes.container} xs={12}>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                src="/static/food.jpg"
                className="bigAvatar"
              />
            </Grid>
            <Grid item>
              <Typography variant="h1" className="title" gutterBottom>
                Shakhor Smith
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.metaWrapper}>
            <span className={classes.meta}>
              <StarRateIcon color="primary" />
              <Typography variant="body1" className="city">
                Atlanta, GA
              </Typography>
            </span>
            <span className={classes.meta}>
              <StarRateIcon color="primary" />
              <Typography variant="body1" className="city">
                Grill Master
              </Typography>
            </span>
            <span className={classes.meta}>
              <StarRateIcon color="primary" />
              <Typography variant="body1" className="city">
                4.9 (50 reviews)
              </Typography>
            </span>
          </div>

          <Typography className="summary" variant="h6">
            There was a feature request in my current company, product team
            requested a table component which should order columns in ascending
            or descending way when clicking the column’s title. At the end of
            this post, you’ll see the working POC. There may be so many things
            to improve in the aspect of code quality but do not forget, this is
            just a POC. I’m looking forward to your responses to the code.
          </Typography>

          <div className={classes.sectionTitle}>
            <Button className="btn">Menu</Button>
            <Button className="btn">Reviews</Button>
            <Button className="btn">Info</Button>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={6} lg={4}>
              <ChefItemCard />
            </Grid>
            <Grid item xs={6} lg={4}>
              <ChefItemCard />
            </Grid>
            <Grid item xs={6} lg={4}>
              <ChefItemCard />
            </Grid>
            <Grid item xs={6} lg={4}>
              <ChefItemCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AppContainer>
  );
};

Chef.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(chefDetailStyles)(Chef);
