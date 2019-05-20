import React from 'react';
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

export default withStyles(style)(PopularChefs);
