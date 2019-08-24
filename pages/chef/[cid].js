import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { AppContainer } from '../../src/components/layouts';
import { Grid, Typography, withStyles } from '../../src/components/core';

import chefDetailStyles from '../../src/assets/styles/consumer/chef/chefDetailStyles';

const Chef = ({ classes }) => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <AppContainer>
      <img
        className={classes.header}
        src="/static/detail.jpg"
        alt="Chef header"
      />
      <Grid container>
        <Grid
          className={classes.leftSection}
          xs={12}
          md={9}
          justify="space-between"
        >
          <Typography variant="h1" className="title" gutterBottom>
            Chef Shakhor Smith
          </Typography>
          <Typography variant="body1" className="city">
            Atlanta
          </Typography>

          <div className="summary">
            <Typography variant="h6">Specialty</Typography>
          </div>
        </Grid>

        <Grid className={classes.rightSection} xs={12} md={3}>
          <Typography variant="h6">Right Section</Typography>
        </Grid>
      </Grid>
    </AppContainer>
  );
};

Chef.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(chefDetailStyles)(Chef);
