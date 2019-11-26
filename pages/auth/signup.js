import React from 'react';
import Link from 'next/link';

import { Button, Grid, Typography } from '../../src/components/core';
import BasicForm, { TextField } from '../../src/components/form';

import authStyles from '../../src/assets/styles/consumer/authStyles';

const Signup = () => {
  const classes = authStyles();
  return (
    <section className={classes.container}>
      <Link href="/">
        <a>
          <img className={classes.logo} src="/static/logo.png" alt="Slyderz" />
        </a>
      </Link>
      <Typography className={classes.welcome} variant="h3">
        Welcome To Slyderz
      </Typography>
      <BasicForm>
        {({ values }) => (
          <Grid className={classes.formContent} container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name="lastName" variant="outlined" label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" variant="outlined" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" variant="outlined" label="Password" />
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.submit}
                fullWidth
                size="large"
                variant="contained"
                color="primary"
              >
                Sign up
              </Button>
              <Typography variant="body1">
                Already have an account?{' '}
                <Link href="/auth/login">
                  <a className={classes.signup}>Sign In</a>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        )}
      </BasicForm>
    </section>
  );
};

export default Signup;
