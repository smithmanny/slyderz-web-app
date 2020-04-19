import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Button } from '../../src/components/shared';
import BasicForm, { TextField } from '../../src/components/form';
import Typography from '../../src/components/shared/Typography';
import Grid from '../../src/components/shared/Grid';

import CREATE_USER_MUTATION from '../../src/libs/gql/mutation/auth/signupMutation.gql';
import SIGNUP_VALIDATION from '../../src/libs/yup/signupValidation';
import authStyles from '../../src/assets/styles/authStyles';

const Signup = () => {
  const classes = authStyles();
  return (
    <section className={classes.container}>
      <Link href="/">
        <a>
          <img className={classes.logo} src="/logo.png" alt="Slyderz" />
        </a>
      </Link>
      <Typography className={classes.welcome} variant="h3">
        Welcome To Slyderz
      </Typography>
      <BasicForm
        mutate={{
          mutation: CREATE_USER_MUTATION,
          toVariables: values => ({
            ...values
          }),
          onCompleted: res => {
            Router.replace('/');
          },
          validation: SIGNUP_VALIDATION
        }}
      >
        <Grid className={classes.formContent} container spacing={0}>
          <Grid item xs={12} sm={6} className="firstName">
            <TextField
              name="firstName"
              variant="outlined"
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} className="lastName">
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
              type="submit"
            // disabled={isSubmitting}
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
      </BasicForm>
    </section>
  );
};

export default Signup;