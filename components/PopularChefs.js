import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

import Chefs from './Chefs';
import Section from './shared/Section';
import Text from './shared/Text';

const style = theme => ({});

const PopularChefs = props => (
  <Section>
    <Text color="inherit" variant="h3" align="center" gutterBottom>
      Popular Chef's
    </Text>
    <Chefs />
  </Section>
);

PopularChefs.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(PopularChefs);
