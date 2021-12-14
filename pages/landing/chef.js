import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import { Container, Fab, Grid, withStyles } from '../../src/components/core';
import { Section } from '../../src/components/layouts/index';

import landingPageStyles from '../../src/assets/styles/consumer/landing/landingPageStyles';

const BecomeChefLandingPage = ({ classes }) => {
  const [isAirtableLoaded, setAirtableStatus] = useState(false);
  useEffect(() => {
    const src = 'https://static.airtable.com/js/embed/embed_snippet_v1.js';
    const element = document.createElement('script');
    element.src = src;
    document.body.appendChild(element);

    setAirtableStatus(true);
  });
  return (
    <div>
      <AppBar
        className={classes.appbar}
        style={{ position: 'relative' }}
        position="static"
        color="default"
      >
        <Toolbar>
          <div className={classes.logo}>
            <div>
              <Link href="/" prefetch>
                <a>
                  <img srcSet="/static/logo.png" alt="Slyderz" />
                </a>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Section>
          <Grid container>
            <Grid item xs={12}>
              {isAirtableLoaded && (
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      '<iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrYFii6uWxuV0iGI?backgroundColor=orange" frameborder="0" onmousewheel="" width="100%" height="3093" style="background: transparent; border: 1px solid #ccc;"></iframe>'
                  }}
                />
              )}
            </Grid>
          </Grid>
        </Section>
      </Container>
    </div>
  );
};

BecomeChefLandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(landingPageStyles)(BecomeChefLandingPage);
