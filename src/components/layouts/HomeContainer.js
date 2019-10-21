import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import { AppBar } from '../core';

const HomeContainer = ({ children, ...props }) => (
  <Container maxWidth="lg" {...props}>
    <AppBar
      style={{
        position: 'absolute',
        top: 0,
        left: 0
      }}
    />
    {children}
  </Container>
);

HomeContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default HomeContainer;
