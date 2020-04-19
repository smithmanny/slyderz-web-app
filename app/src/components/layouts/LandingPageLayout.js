import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import BasicForm, { Select, TextField } from '../Form';
import { Button, Fab } from '../shared';
import Container from '../shared/consumerContainer';
import Grid from '../shared/Grid';
import Typography from '../shared/Typography';
import { Section } from './index';
import HowItWorks from '../howItWorks';
import landingPageStyles from '../../assets/styles/landing/landingPageStyles';

const LandingPageLayout = () => {
  const classes = landingPageStyles();
  const [sectionHeight, setSectionHeight] = useState(null);
  useEffect(() => {
    setSectionHeight(window.innerHeight);
  });

  const handleJoinBeta = () => {
    document.getElementById('notify').scrollIntoView();
  };

  const handleFormSubmit = ({ customerType, email }) => {
    const listType = {
      chef: '691a21c8-30dd-43e9-a98b-0af3534d9ac5',
      customer: '142eafaf-b882-404f-9c5e-041177e30e5e'
    };
    const req = {
      list_ids: [listType[customerType]],
      contacts: [
        {
          email,
          custom_fields: {
            e1_T: customerType
          }
        }
      ]
    };

    if (customerType || email !== null) {
      fetch('https://api.sendgrid.com/v3/marketing/contacts', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization:
            'Bearer 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'
        },
        body: JSON.stringify(req)
      })
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <AppBar className={classes.appbar} position="static" color="default">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item style={{ marginRight: 'auto' }}>
              <Link href="/">
                <a className={classes.logo}>
                  <img srcSet="/logo-white.png" alt="Slyderz" />
                </a>
              </Link>
            </Grid>

            <Grid item md={8}>
              <ul className={classes.linksSection}>
                <li>
                  <Fab
                    color="primary"
                    size="medium"
                    variant="extended"
                    onClick={handleJoinBeta}
                  >
                    Join our beta
                  </Fab>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <section
        className={classes.headerRoot}
        style={{ height: `${sectionHeight}px` }}
      >
        <Grid container>
          <Grid item md={6}>
            <img
              className="header-img"
              alt="Couple cooking"
              srcSet="/header.jpg"
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
      </section>

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
                Our goal is to help everyone experience high-quality cuisine
                with friends and family without leaving your home.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.whoWeAreImg}>
                <img srcSet="/brocolli_transparent.png" alt="Brocolli" />
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
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Choose between our selection of experienced chefs
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    className={classes.text}
                    paragraph
                  >
                    Get authentic food prepared by in-house chef
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

        <Link href="/landing/chef">
          <a>
            <img
              srcSet="/become-chef-banner.png"
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
        >
          <BasicForm
            mutate={{
              toVariables: values => ({
                ...values
              }),
              onSubmit: values => handleFormSubmit(values)
            }}
          >
            <div
              style={{
                maxWidth: 650,
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
                    name="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
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
                    type="submit"
                    fullWidth
                  >
                    Get Early Access
                  </Button>
                </Grid>
              </Grid>
            </div>
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
                <img srcSet="/instagram.png" alt="Slyderz Instagram" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/SlyderzApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img srcSet="/twitter.png" alt="Slyderz Twitter" />
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/slyderz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img srcSet="/facebook.png" alt="Slyderz Facebook" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default LandingPageLayout;
