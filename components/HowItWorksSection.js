import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import Section from './shared/Section';
import Text from './shared/Text';

const styles = theme => ({
  title: {
    marginBottom: theme.spacing(5)
  },
  imageWrapper: {
    height: '250px',
    textAlign: 'center',
    marginBottom: theme.spacing(2)
  },
  image: {
    maxWidth: 350,
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
});

class HowItWorksSection extends React.PureComponent {
  render() {
    const { classes } = this.props;

    const HIWStep = ({ image, title, content }) => (
      <Grid item xs={12} lg={4}>
        <div className={classes.imageWrapper}>
          <img
            className={classes.image}
            src={image}
            alt={title}
            loading="lazy"
          />
        </div>
        <Text color="inherit" variant="h5" align="center" gutterBottom>
          {title}
        </Text>
        <Text color="inherit" paragraph variant="body1" align="center">
          {content}
        </Text>
      </Grid>
    );

    return (
      <Section fullWidth>
        <Text
          color="inherit"
          variant="h3"
          align="center"
          className={classes.title}
        >
          How It Works
        </Text>

        <Grid container spacing={5}>
          <HIWStep
            image="/static/hiw-party.png"
            title="Plan"
            content="It can be a birthday party, dinner night, or even a dinner for one."
          />
          <HIWStep
            image="/static/hiw-search.png"
            title="Browse"
            content="Browse our selection of chefs and select the new cuisine you would like to try."
          />
          <HIWStep
            image="/static/hiw-schedule.png"
            title="Book"
            content="Select the location and time. Our chef will pick up fresh ingredients
          the day of your event."
          />
        </Grid>
      </Section>
    );
  }
}

HowItWorksSection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HowItWorksSection);
