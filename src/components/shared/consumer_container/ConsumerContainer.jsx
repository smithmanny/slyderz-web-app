import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import AppBar from '../../appbar';
import Footer from '../footer'
import consumerContainerStyles from './styles';

const ConsumerContainer = ({ children, ...props }) => {
  const classes = consumerContainerStyles();
  return (
    <React.Fragment>
      <Container className={classes.container} maxWidth="xl" {...props}>
        <AppBar />
        {children}
      </Container>
      <Footer />
    </React.Fragment>
  );
};

ConsumerContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default ConsumerContainer;