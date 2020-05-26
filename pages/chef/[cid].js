import React from 'react';
import { useRouter } from 'next/router';

import chefDetailStyles from '../../src/assets/styles/consumer/chefStyles';
import { withWindow } from '../../src/components/shared/WindowProvider';

import ConsumerContainer from '../../src/components/shared/consumer_container';
import Button from '../../src/components/shared/Button';
import Paper from '../../src/components/shared/Paper';
import { Avatar } from '../../src/components/shared';
import Typography from '../../src/components/shared/Typography';
import Grid from '../../src/components/shared/Grid';
import { StarRateIcon } from '../../src/assets/icons';
import ChefDishCard from '../../src/components/chef/dish_card';

const Chef = ({ isMobile }) => {
  const classes = chefDetailStyles();
  const router = useRouter();
  const { cid } = router.query;
  console.log({ isMobile})

  const items = [
    {
      description: 'Sauted Salmon, green peas, and mashed potatoes',
      name: 'The Ultimate Dish',
      picture: null,
      pricePerPerson: 10,
    },
    {
      description: 'Sauted Salmon, green peas, and mashed potatoes',
      name: 'The Ultimate Dish',
      picture: null,
      pricePerPerson: 10,
    },
    {
      description: 'Sauted Salmon, green peas, and mashed potatoes',
      name: 'The Ultimate Dish',
      picture: null,
      pricePerPerson: 10,
    },
    {
      description: 'Sauted Salmon, green peas, and mashed potatoes',
      name: 'The Ultimate Dish',
      picture: null,
      pricePerPerson: 10,
    },
    {
      description: 'Sauted Salmon, green peas, and mashed potatoes',
      name: 'The Ultimate Dish',
      picture: null,
      pricePerPerson: 10,
    },
    {
      description: 'Sauted Salmon, green peas, and mashed potatoes',
      name: 'The Ultimate Dish',
      picture: null,
      pricePerPerson: 10,
    }
  ]
  return (
    <ConsumerContainer disableGutters={isMobile ? true : false}>
      <Grid container direction={isMobile ? 'row' : 'row-reverse'}>
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
              <Grid
                className={classes.chefAvatarContainer}
                item 
                xs={12} 
                md={1}
              >
                <Avatar 
                  alt="Remy Sharp"
                  className={classes.chefAvatar}
                  src="/food.jpg"
                  />
              </Grid>
              <Grid item xs={12} md>
                <Typography 
                  className={classes.chefName} 
                  variant="h1" 
                >
                  Shakhor Smith
                </Typography>
                <span className={classes.chefRating}>
                  <StarRateIcon color="primary" />
                  <Typography variant="body1" className="city">
                    4.9 (50 reviews)
                  </Typography>
                </span>
                <Typography variant="body1" align="center">
                  There was a feature request in my current company, product team
                  requested a table component which should order columns in ascending
                  or descending way when clicking the column’s title. At the end of
                  this post, you’ll see the working POC. There may be so many things
                  to improve in the aspect of code quality but do not forget, this is
                  just a POC. I’m looking forward to your responses to the code.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Grid container direction={isMobile ? 'row' : 'row-reverse'}>
        <Grid item xs={12} md={5}>
          Order summary
        </Grid>
        <Grid item xs={12} md={7}>
          <ChefDishCard dishes={items} />
        </Grid>
      </Grid>
    </ConsumerContainer>
  );
};

export default withWindow(Chef);
