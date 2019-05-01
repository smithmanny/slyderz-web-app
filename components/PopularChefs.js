import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Section from './shared/Section';
import Text from './shared/Text';

const style = theme => ({});

const PopularChefs = ({ classes }) => (
  <Section>
    <Text color="inherit" variant="h3" align="center" gutterBottom>
      Popular Chef's
    </Text>
  </Section>
);

PopularChefs.propTypes = {
  classes: PropTypes.shape()
};

export default withStyles(style)(PopularChefs);
