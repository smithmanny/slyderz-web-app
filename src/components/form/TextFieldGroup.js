import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import { Grid, withStyles } from '../core';
import textFieldStyles from '../../assets/styles/consumer/textFieldGroupStyles';

const TextFieldGroup = ({ xs = 12, md, lg, classes, ...props }) => (
  <Grid item xs={xs} md={md} lg={lg}>
    <TextField className={classes.textField} margin="normal" {...props} />
  </Grid>
);

TextFieldGroup.propTypes = {
  classes: PropTypes.object,
  xs: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  props: PropTypes.object
};

export default withStyles(textFieldStyles)(TextFieldGroup);
