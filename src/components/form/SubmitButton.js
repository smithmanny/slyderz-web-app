import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const TextFieldGroup = ({ xs, md, lg, ...props }) => (
  <Grid item xs={xs} md={md} lg={lg}>
    <Button
      type="submit"
      variant="contained"
      color="primary"
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

export default TextFieldGroup;
