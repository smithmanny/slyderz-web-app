import React from 'react';
import Link from 'next/link';

import { Avatar, Card, CardContent, CardMedia } from '../src/components/shared';
import Typography from '../src/components/shared/Typography';
import Grid from '../src/components/shared/Grid';
import { AppContainer, Section } from '../src/components/layouts/index';

import homePageStyles from '../src/assets/styles/consumer/homePageStyles';

const Index = ({ ...props }) => {
  const classes = homePageStyles();
  return (
    <AppContainer>
      <div className={classes.homeContainer}>
        <Section title="Explore Food Types">
          <div className={classes.exploreItem}>
            <Avatar>V</Avatar>
            <span>
              <Typography variant="h6">Vegan</Typography>
            </span>
          </div>
        </Section>

        <Section title="Chefs near you">
          <Grid container>
            <Grid item xs={12} md={3}>
              <Link href="/chef/1">
                <a>
                  <Card
                    classes={{
                      root: classes.card
                    }}
                  >
                    <CardMedia
                      classes={{
                        root: classes.cardMedia
                      }}
                      image="/food.jpg"
                      title="Chef dish"
                    />
                    <CardContent
                      classes={{ root: classes.cardMediaRoot }}
                      className={classes.cardContent}
                    >
                      <Typography variant="button">BBQ • Atlanta</Typography>
                      <div className="name">
                        <Typography variant="h6">Chef Shakhor</Typography>
                      </div>
                      <Typography variant="body1">
                        Starting at $17/person
                      </Typography>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </Grid>
          </Grid>
        </Section>
      </div>
    </AppContainer>
  );
};

export default Index;
