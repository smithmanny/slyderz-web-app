import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '../src/components/core';
import { LandingPageLayout } from '../src/components/layouts';

import homePageStyles from '../src/assets/styles/consumer/homePageStyles';

const Index = ({ classes }) => <LandingPageLayout />;

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homePageStyles)(Index);
