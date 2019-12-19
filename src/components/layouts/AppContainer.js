import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '../core/AppBar';
import Container from '../core/Container';
import appContainerStyles from '../../assets/styles/consumer/appContainerStyles';

const AppContainer = ({ children, ...props }) => {
  const classes = appContainerStyles();
  return (
    <Container className={classes.container} maxWidth="xl" {...props}>
      <AppBar />
      {children}
    </Container>
  );
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppContainer;
