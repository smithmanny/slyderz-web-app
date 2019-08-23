import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import { AppBar } from '../core';

const AppContainer = ({ children, ...props }) => (
  <React.Fragment>
    <AppBar
      linkProps={{
        style: {
          color: 'black'
        }
      }}
    />
    <Container maxWidth="lg" {...props}>
      {children}
    </Container>
  </React.Fragment>
);

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContainer;
