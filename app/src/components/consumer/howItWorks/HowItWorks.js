import React from 'react';

import Grid from '../../shared/Grid';
import Typography from '../../shared/Typography';
import { Section } from '../../layouts';
import howItWorksStyles from './styles';

const HowItWorks = ({ ...props }) => {
  const classes = howItWorksStyles();
  return (
    <Section>
      <div className={classes.container}>
        <div className={classes.titleWrapper}>
          <Typography variant="h4" align="center" className={classes.title}>
            How It Works
          </Typography>
        </div>
        <Grid container className={classes.infoImages} justify="space-around">
          <Grid item md={4}>
            <div className={classes.infoImage}>
              <img srcSet="/hiw-planning.png" alt="Party" />
            </div>
            <Typography variant="h5" align="center" className={classes.text}>
              Explore
            </Typography>
            <Typography variant="h6" align="center" color="primary">
              Explore private chefs and all the dishes they have to offer
            </Typography>
          </Grid>
          <Grid item md={4}>
            <div className={classes.infoImage}>
              <img srcSet="/hiw-chef.png" alt="Party" />
            </div>
            <Typography variant="h5" align="center" className={classes.text}>
              Easy Ordering
            </Typography>
            <Typography variant="h6" align="center" color="primary">
              Choose a chef you like, the dishes and book it
            </Typography>
          </Grid>
          <Grid item md={4}>
            <div className={classes.infoImage}>
              <img srcSet="/hiw-party.png" alt="Party" />
            </div>
            <Typography variant="h5" align="center" className={classes.text}>
              Celebrate
            </Typography>
            <Typography variant="h6" align="center" color="primary">
              Enjoy a home cooked meal from your own private chef
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Section>
  );
};

export default HowItWorks;
