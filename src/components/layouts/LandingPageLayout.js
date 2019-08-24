import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Container, Grid, Typography, withStyles } from '../core';
import { Section } from './index';
import HowItWorks from '../howItWorks';

import landingPageStyles from '../../assets/styles/consumer/landing/landingPageStyles';

const LandingPageLayout = ({ classes }) => (
  <div>
    <AppBar className={classes.appbar} position="static" color="default">
      <Toolbar>
        <div className={classes.logo}>
          <div>
            <Link href="/" prefetch>
              <a>
                <Typography variant="h6">Slyderz</Typography>
              </a>
            </Link>
          </div>
        </div>
        <div className={classes.linksSection}>
          <ul>
            <li>
              <a>
                <Typography variant="h6">Help</Typography>
              </a>
            </li>
            <li>
              <a>
                <Typography variant="h6">Sign up</Typography>
              </a>
            </li>
            <li>
              <a>
                <Typography variant="h6">Log in</Typography>
              </a>
            </li>
          </ul>
        </div>
      </Toolbar>
    </AppBar>

    <div className={classes.headerRoot}>
      <Grid container>
        <Grid item md={6}>
          <img
            className="header-img"
            alt="Couple cooking"
            src="/static/Header.jpg"
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
              Find your next customer, platform for chefs
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>

    <Container maxWidth="lg">
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
              Slyderz is online platform bringing consumers the unique
              experience of having a private chef in their home.
            </Typography>
            <Typography variant="body1" className={classes.text} paragraph>
              Our goal is to offer everyone the experience of having a private
              chef and different cultures food.
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant="body1">PICTURE GOES HERE</Typography>
          </Grid>
        </Grid>
      </Section>
    </Container>

    <HowItWorks
      sectionProps={{
        style: {
          backgroundColor: '#FFFAF5'
        }
      }}
    />

    <Container maxWidth="lg">
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
                  Be your own boss
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item md={6} align="center">
            <Typography variant="h6" color="primary">
              For Consumers
            </Typography>
            <ul>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Access to our selection of experienced chefs
                </Typography>
              </li>
              <li>
                <Typography variant="body1" className={classes.text} paragraph>
                  Quality top of the line meals without breaking the bank
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
    </Container>
    <footer className={classes.footer}>
      <div>
        <Typography variant="h4" className={classes.title}>
          Follow Us
        </Typography>
      </div>
    </footer>
  </div>
);

LandingPageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(landingPageStyles)(LandingPageLayout);
