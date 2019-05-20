import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const useStyles = theme => ({
  textField: {
    width: '100%'
  }
});

const TextFieldGroup = ({ xs = 12, md, lg, classes, ...props }) => (
  <Grid item xs={xs} md={md} lg={lg}>
    <TextField className={classes.textField} margin="normal" {...props} />
  </Grid>
);

TextFieldGroup.propTypes = {
  classes: PropTypes.shape(),
  xs: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  props: PropTypes.shape()
};

export default withStyles(useStyles)(TextFieldGroup);
