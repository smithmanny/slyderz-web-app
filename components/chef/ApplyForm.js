import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/styles';

import { TextField, SubmitButton } from '../form/Form';

const styles = theme => ({
  cancel: {
    margin: 'auto 0',
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
});

const ApplyForm = ({ classes, handleChange, values, user }) => (
  <React.Fragment>
    <TextField
      variant="outlined"
      label="Email"
      type="email"
      name="email"
      autoComplete="email"
      onChange={handleChange}
      value={values.email}
      disabled={!!user}
    />
    <TextField
      xs={6}
      variant="outlined"
      label="First Name"
      name="firstName"
      autoComplete="name"
      onChange={handleChange}
      value={values.firstName}
      disabled={!!user}
    />
    <TextField
      xs={6}
      variant="outlined"
      label="Last Name"
      name="lastName"
      onChange={handleChange}
      value={values.lastName}
      disabled={!!user}
    />
    <TextField
      variant="outlined"
      label="Address"
      name="address1"
      autoComplete="address-1"
      onChange={handleChange}
      value={values.address1}
    />
    <TextField
      variant="outlined"
      label="P.O. Box"
      name="address2"
      autoComplete="address-2"
      onChange={handleChange}
      value={values.address2}
    />
    <TextField
      variant="outlined"
      label="City"
      name="city"
      autoComplete="city"
      onChange={handleChange}
      value={values.city}
    />
    <TextField
      xs={6}
      variant="outlined"
      label="State"
      name="state"
      autoComplete="state"
      onChange={handleChange}
      value={values.state}
    />
    <TextField
      xs={6}
      variant="outlined"
      label="Zip Code"
      name="postalCode"
      autoComplete="postal-code"
      onChange={handleChange}
      value={values.postalCode}
    />
    <SubmitButton
      xs={4}
      md={2}
      disabled={user && user.chef && user.chef.isChef === 'PENDING'}
    >
      Submit
    </SubmitButton>
    <Link href="/">
      <a className={classes.cancel}>cancel</a>
    </Link>
  </React.Fragment>
);

ApplyForm.defaultProps = {
  user: {}
};

ApplyForm.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  handleChange: PropTypes.func,
  values: PropTypes.object
};

export default withStyles(styles)(ApplyForm);
