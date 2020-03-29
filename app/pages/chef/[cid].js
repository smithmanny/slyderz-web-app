import React from 'react';
import { useRouter } from 'next/router';

import { AppContainer } from '../../src/components/layouts';
import { Avatar, Button } from '../../src/components/shared';
import Typography from '../../src/components/shared/Typography';
import Grid from '../../src/components/shared/Grid';
import { StarRateIcon } from '../../src/assets/icons';
import ChefItemCard from '../../src/components/consumer/chef/item_card';
import chefDetailStyles from './styles';

const Chef = () => {
  const classes = chefDetailStyles();
  const router = useRouter();
  const { cid } = router.query;

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
    <AppContainer>
      <Grid container className={classes.header}>
        <img srcSet="/detail.jpg" alt="Chef header" />
      </Grid>

      <Grid container>
        <Grid item className={classes.container} xs={12}>
          <Grid container alignItems="center">
            <Grid item>
              <Avatar alt="Remy Sharp" src="/food.jpg" className="bigAvatar" />
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

          <Typography className="summary" variant="h6" align="center">
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
            {items.map((item, i) => (
              <Grid key={i} item xs={12} lg={4}>
                <ChefItemCard name={item.name} description={item.description} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </AppContainer>
  );
};

export default Chef;
