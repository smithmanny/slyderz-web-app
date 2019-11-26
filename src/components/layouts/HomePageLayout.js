import React from 'react';
import Link from 'next/link';

import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '../core';
import { AppContainer, Section } from './index';

import homePageStyles from '../../assets/styles/consumer/homePageStyles';

const HomePageLayout = () => {
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
                      image="/static/food.jpg"
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

export default HomePageLayout;
