import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import AppBar from '../../appbar';
import consumerContainerStyles from './styles';

const AppContainer = ({ children, ...props }) => {
  const classes = consumerContainerStyles();
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
