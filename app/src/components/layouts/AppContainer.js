import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../consumer/appbar';
import Container from '../shared/container';

import { CheckoutCartProvider } from '../../context/checkoutCartContext';
import appContainerStyles from '../shared/container/styles';

const AppContainer = ({ children, ...props }) => {
  const classes = appContainerStyles();
  return (
    <CheckoutCartProvider>
      <Container className={classes.container} maxWidth="xl" {...props}>
        <AppBar />
        {children}
      </Container>
    </CheckoutCartProvider>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContainer;
