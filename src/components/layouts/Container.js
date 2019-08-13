import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import { AppBar } from '../core';

const AppContainer = ({ children, ...props }) => (
  <Container maxWidth="lg" {...props}>
    <AppBar
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'transparent',
        boxShadow: 'none'
      }}
    />
    {children}
  </Container>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContainer;
