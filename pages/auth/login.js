import React from 'react';
import Link from 'next/link';

import { Button, Typography } from '../../src/components/core';
import BasicForm, { TextField } from '../../src/components/form';

import authStyles from '../../src/assets/styles/consumer/authStyles';

const Login = () => {
  const classes = authStyles();
  return (
    <section className={classes.container}>
      <Link href="/">
        <a>
          <img className={classes.logo} src="/static/logo.png" alt="Slyderz" />
        </a>
      </Link>
      <Typography className={classes.welcome} variant="h3">
        Welcome Back
      </Typography>
      <BasicForm>
        {({ values }) => (
          <div className={classes.formContent}>
            <TextField
              name="email"
              variant="outlined"
              label="Enter your email"
            />
            <TextField name="password" variant="outlined" label="Password" />
            <Button
              className={classes.submit}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <Typography variant="body1">
              Don't have an account?{' '}
              <Link href="/auth/signup">
                <a className={classes.signup}>Create Account</a>
              </Link>
            </Typography>
          </div>
        )}
      </BasicForm>
    </section>
  );
};

export default Login;
