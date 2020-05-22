import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

import Button from '../shared/Button';
import BasicForm, { TextField } from '../form';
import Typography from '../shared/Typography';
import Grid from '../shared/Grid';

import CREATE_USER_MUTATION from '../../libs/gql/mutation/auth/signupMutation.gql';
import SIGNUP_VALIDATION from '../../libs/yup/signupValidation';
import signupStyles from './styles';

const SignupModalForm = ({ closeModal, openLoginModal }) => {
  const classes = signupStyles();
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
        <Grid container className={classes.formContent} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className="firstName"
              name="firstName"
              variant="outlined"
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className="lastName"
              name="lastName" 
              variant="outlined" 
              label="Last Name" 
            />
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
              <Button 
                className={classes.signup} 
                onClick={() => {
                  closeModal()
                  openLoginModal()
              }}
              >
                Sign In
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </BasicForm>
    </section>
  );
};

export default SignupModalForm;