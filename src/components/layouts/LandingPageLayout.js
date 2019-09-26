import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {
  Button,
  Container,
  Fab,
  Grid,
  TextField,
  Typography,
  withStyles
} from '../core';
import BasicForm from '../form';
import { Section } from './index';
import HowItWorks from '../howItWorks';

import landingPageStyles from '../../assets/styles/consumer/landing/landingPageStyles';

const LandingPageLayout = ({ classes }) => (
  <div>
    <AppBar className={classes.appbar} position="static" color="default">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item md={4}>
            <Link href="/">
              <a className={classes.logo}>
                <img srcSet="/static/logo-white.png" alt="Slyderz" />
              </a>
            </Link>
          </Grid>

          <Grid item md={8}>
            <ul className={classes.linksSection}>
              <li>
                <Fab color="primary" size="medium" variant="extended">
                  Join our beta
                </Fab>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

    <div className={classes.headerRoot}>
      <Grid container>
        <Grid item md={6}>
          <img
            className="header-img"
            alt="Couple cooking"
            srcSet="/static/header.jpg"
          />
        </Grid>

        <Grid item md={6} className="header-content">
          <div>
            <Typography
              variant="h1"
              align="center"
              color="primary"
              className={classes.introText}
            >
              Experience restaurant meals <br />
              at home
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>

    <Container maxWidth="xl">
      <Section
        title="Who we are"
        titleProps={{
          variant: 'h4',
          classes: {
            root: classes.title
          }
        }}
      >
        <Grid container>
          <Grid item md={6}>
            <Typography variant="body1" className={classes.text} paragraph>
              Slyderz is an on-demand platform for consumers to hire
              professional chefs for in-home experiences.
            </Typography>
            <Typography variant="body1" className={classes.text} paragraph>
              Our goal is to help everyone experience high-quality cuisine with
              friends and family without leaving your home.
            </Typography>
          </Grid>
          <Grid item md={6}>
            <div className={classes.whoWeAreImg}>
              <img srcSet="/static/brocolli_transparent.png" alt="Brocolli" />
            </div>
          </Grid>
        </Grid>
      </Section>
    </Container>

    <HowItWorks />

    <Container maxWidth="xl">
      <Section
        title="What we offer"
        align="center"
        titleDivProps={{
          style: {
            textAlign: 'center'
          }
        }}
        titleProps={{
          variant: 'h4',
          classes: {
            root: classes.title
          }
        }}
      >
        <Grid container className={classes.forWhoSection}>
          <Grid item md={6} align="center">
            <Typography variant="h6" color="primary">
              For Chefs
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Your own chef profile and access to our customers
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Flexibility. No Contracts.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Be in control of your prices and availability
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item md={6} align="center">
            <Typography variant="h6" color="primary">
              For Customers
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Choose between our selection of experienced chefs
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Get authentic food prepared by in-house chef
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Experience new food near you
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Section>

      <Link href="/landing/chef" prefetch>
        <a>
          <img
            srcSet="/static/become-chef-banner.png"
            alt="Become a chef"
            style={{ width: '100%' }}
          />
        </a>
      </Link>

      <Section
        id="notify"
        title="Sign up for updates"
        subTitle="News • Special Offers • Information about Slyderz"
        align="center"
        titleDivProps={{
          style: {
            textAlign: 'center'
          }
        }}
        titleProps={{
          variant: 'h4',
          classes: {
            root: classes.title
          }
        }}
        style={{
          minHeight: 250
        }}
      >
        <BasicForm
          mutate={{
            variables: values => ({
              ...values
            })
          }}
        >
          {({ isSubmitting, handleChange, values }) => (
            <div
              style={{
                maxWidth: 900,
                margin: 'auto'
              }}
            >
              <Grid container justify="center" spacing={3}>
                <Grid item xs={12} md={6} align="center">
                  <TextField
                    className={classes.emailInput}
                    InputProps={{
                      disableUnderline: true
                    }}
                    name="Email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="customer-type">
                      Do you want to cook or find nearby chefs?
                    </InputLabel>
                    <Select
                      value={values.customerType}
                      onChange={handleChange}
                      inputProps={{
                        name: 'customerType',
                        id: 'customer-type'
                      }}
                    >
                      <MenuItem value="customer">
                        Show me nearby chefs 👀
                      </MenuItem>
                      <MenuItem value="chef">I want to cook 👩🏾‍🍳</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} align="center">
                  <Button
                    disabled={isSubmitting}
                    className={classes.emailInputBtn}
                    classes={{
                      root: classes.emailInputBtnHover
                    }}
                    fullWidth
                  >
                    Get Early Access
                  </Button>
                </Grid>
              </Grid>
            </div>
          )}
        </BasicForm>
      </Section>
    </Container>
    <footer className={classes.footer}>
      <div>
        <Typography variant="h4" gutterBottom className={classes.title}>
          Follow Us
        </Typography>
        <br />
        <Typography variant="h6">#Slyderz</Typography>

        <ul>
          <li>
            <a
              href="https://www.instagram.com/slyderz_app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img srcSet="/static/instagram.png" alt="Slyderz Instagram" />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/SlyderzApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img srcSet="/static/twitter.png" alt="Slyderz Twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/slyderz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img srcSet="/static/facebook.png" alt="Slyderz Facebook" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
);

LandingPageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(landingPageStyles)(LandingPageLayout);
