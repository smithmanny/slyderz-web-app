import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  textField: {
    // width: '100%'
  }
});

const TextFieldGroup = ({ xs, md, lg, classes, ...props }) => (
  <Grid item xs={xs} md={md} lg={lg}>
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      className={classes.textField}
      fullWidth
      {...props}
    />
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
