import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '../src/components/core';

const errorStyles = theme => ({
  div: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '850px',
    margin: 'auto',
    maxHeight: '500px',
    padding: theme.spacing(2)
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const { statusCode } = res;

    if (err) {
      return err.statusCode;
    }
    return { statusCode };
  }

  render() {
    const { classes } = this.props;
    return <div>ERROR</div>;
  }
}

Error.propTypes = {
  classes: PropTypes.object
};

export default withStyles(errorStyles)(Error);
