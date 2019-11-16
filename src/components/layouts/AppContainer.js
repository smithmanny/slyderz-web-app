import React from 'react';
import PropTypes from 'prop-types';

import { AppBar, Container } from '../core';

const AppContainer = ({ children, ...props }) => (
  <Container maxWidth="xl" style={{ maxWidth: '1800px' }} {...props}>
    <AppBar />
    {children}
  </Container>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContainer;
