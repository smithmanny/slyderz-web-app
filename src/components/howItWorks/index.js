import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, withStyles } from '../core';
import { Section } from '../layouts';
import howItWorksStyles from '../../assets/styles/consumer/howItWorksStyles';

const HowItWorks = ({ classes, ...props }) => (
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
            <img srcSet="/static/hiw-planning.png" alt="Party" />
          </div>
          <Typography variant="h6" align="center" className={classes.text}>
            Explore
          </Typography>
        </Grid>
        <Grid item md={4}>
          <div className={classes.infoImage}>
            <img srcSet="/static/hiw-chef.png" alt="Party" />
          </div>
          <Typography variant="h6" align="center" className={classes.text}>
            Easy Ordering
          </Typography>
        </Grid>
        <Grid item md={4}>
          <div className={classes.infoImage}>
            <img srcSet="/static/hiw-party.png" alt="Party" />
          </div>
          <Typography variant="h6" align="center" className={classes.text}>
            Celebrate
          </Typography>
        </Grid>
      </Grid>
    </div>
  </Section>
);

HowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(howItWorksStyles)(HowItWorks);
