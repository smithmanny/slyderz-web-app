import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import {
  Button,
  Container,
  Fab,
  Grid,
  TextField,
  Typography,
  withStyles
} from '../core';
import { Section } from './index';
import HowItWorks from '../howItWorks';

import landingPageStyles from '../../assets/styles/consumer/landing/landingPageStyles';

const LandingPageLayout = ({ classes }) => {
  const [values, setValues] = React.useState({
    email: '',
    customerType: 'chef'
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
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
                  <Typography variant="h6">About</Typography>
                </a>
              </li>
              <li>
                <a>
                  <Typography variant="h6">FAQ</Typography>
                </a>
              </li>
              <li>
                <a href="#notify">
                  <Fab color="primary" size="medium" variant="extended">
                    Notify Me
                  </Fab>
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
              src="/static/header.jpg"
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
                Slyderz is a on-demand platform for consumers to hire
                professional chefs for in-home experiences.
              </Typography>
              <Typography variant="body1" className={classes.text} paragraph>
                Our goal is to offer everyone the experience of having a private
                chef and different cultures food.
              </Typography>
            </Grid>
            <Grid item md={6}>
              <div className={classes.whoWeAreImg}>
                <img src="/static/brocolli_transparent.png" alt="Brocolli" />
              </div>
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
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Your own chef profile and access to our customers
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Flexibility. No Contracts.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
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
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Access to our selection of experienced chefs
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Quality top of the line meals without breaking the bank
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Experience new food near you
                  </Typography>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Section>

        <Section
          title="Stay Up To Date"
          subTitle="Restaurant Meals • In-home Chef • Best Experience"
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
          <Grid container justify="center" spacing={2} id="notify">
            <Grid item xs={12} md={4} align="center">
              <TextField
                className={classes.emailInput}
                InputProps={{
                  disableUnderline: true
                }}
                name="Email"
                value={values.email}
                type="email"
                onChange={handleChange('email')}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} md={2} align="center">
              <Button
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
        </Section>
      </Container>
      <footer className={classes.footer}>
        <div>
          <Typography variant="h4" className={classes.title}>
            Follow Us
          </Typography>

          <ul>
            <li>
              <img src="/static/instagram.png" alt="" />
            </li>
            <li>
              <img src="/static/twitter.png" alt="" />
            </li>
            <li>
              <img src="/static/facebook.png" alt="" />
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

LandingPageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(landingPageStyles)(LandingPageLayout);
