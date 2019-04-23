import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Text = props => (
  <Typography
    variant={props.type || 'caption'}
    color="primary"
    gutterBottom
    {...props}
  />
);

Text.propTypes = {
  type: PropTypes.string
};

export default Text;
