import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Section from './shared/Section';
import SearchBar from './shared/SearchBar';
import Text from './shared/Text';

const style = theme => ({
  header: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'url(/static/detail.jpg) no-repeat center center'
  },
  intro: {
    color: theme.palette.white.main
  }
});

const Index = ({ classes }) => (
  <Section className={classes.header} fullWidth>
    <Text className={classes.intro} variant="h2" align="center" gutterBottom>
      Your on-demand Restaurant
    </Text>
    <SearchBar />
  </Section>
);

Index.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Index);
