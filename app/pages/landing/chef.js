import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

import Grid from '../../src/components/shared/Grid';
import Container from '../../src/components/shared/container';
import { Section } from '../../src/components/layouts/index';

import landingPageStyles from '../../src/assets/styles/landing/landingPageStyles';

const BecomeChefLandingPage = () => {
  const classes = landingPageStyles();
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
              <Link href="/">
                <a>
                  <img srcSet="/logo.png" alt="Slyderz" />
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

export default BecomeChefLandingPage;
