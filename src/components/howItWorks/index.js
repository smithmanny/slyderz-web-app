import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, withStyles } from '../core';
import { Section } from '../layouts';
import howItWorksStyles from '../../assets/styles/consumer/howItWorksStyles';

const HowItWorks = ({ classes }) => (
  <Section>
    <Typography variant="h4" align="center" className={classes.hiwTitle}>
      How It Works
    </Typography>
    <Grid container className={classes.infoImages} justify="space-around">
      <Grid item md={4}>
        <div className={classes.infoImage}>
          <img src="/static/hiw-party.png" alt="Party" />
        </div>
        <Typography variant="h6" align="center">
          Plan
        </Typography>
      </Grid>
      <Grid item md={4}>
        <div className={classes.infoImage}>
          <img src="/static/hiw-chef.png" alt="Party" />
        </div>
        <Typography variant="h6" align="center">
          Search
        </Typography>
      </Grid>
      <Grid item md={4}>
        <div className={classes.infoImage}>
          <img src="/static/hiw-party.png" alt="Party" />
        </div>
        <Typography variant="h6" align="center">
          Celebrate
        </Typography>
      </Grid>
    </Grid>
  </Section>
);

HowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(howItWorksStyles)(HowItWorks);
