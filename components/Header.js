import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Section from './shared/Section';
import SearchBar from './shared/SearchBar';
import Text from './shared/Text';

const style = theme => ({
  header: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background:
      'url(https://res.cloudinary.com/slyderz/image/upload/v1558340969/jason-briscoe-1561473-unsplash_k9bqh3.jpg) no-repeat',
    objectFit: 'contain',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  introBG: {
    backgroundColor: '#00000085',
    padding: theme.spacing(2)
  },
  intro: {
    color: theme.palette.white.main,
    fontWeight: 'bold',
    fontSize: 60
  },
  subIntro: {
    color: theme.palette.white.main
  }
});

const Index = ({ classes }) => (
  <Section className={classes.header} fullWidth>
    <div className={classes.introBG}>
      <Text className={classes.intro} variant="h1" align="center" gutterBottom>
        Your on-demand Restaurant
      </Text>
      <Text
        className={classes.subIntro}
        variant="h5"
        align="center"
        gutterBottom
      >
        Book Your Own Personal Chef
      </Text>
    </div>
    {/* Next Release */}
    {/* <SearchBar /> */}
  </Section>
);

Index.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Index);
