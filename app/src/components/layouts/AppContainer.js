import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AppBar from '../consumer/appbar';
import Container from '../shared/container';

import { CheckoutCartProvider } from '../../context/checkoutCartContext';
import appContainerStyles from '../shared/container/styles';

const AppContainer = ({ children, ...props }) => {
  const classes = appContainerStyles();
  const [showCartModal, setCartModal] = useState(false);
  return (
    <Container className={classes.container} maxWidth="xl" {...props}>
      <CheckoutCartProvider value={[showCartModal, setCartModal]}>
        <AppBar />
        {children}
      </CheckoutCartProvider>
    </Container>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContainer;
