import React from 'react';
import Link from 'next/link';

import { Avatar, Card, CardContent, CardMedia } from '../shared';
import Typography from '../shared/Typography';
import Grid from '../shared/Grid';
import Section from '../shared/section';
import ConsumerContainer from '../shared/consumer_container'

import homePageStyles from './styles';

const LoggedInContainer = ({ ...props }) => {
  const classes = homePageStyles();
  return (
    <ConsumerContainer>
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
    </ConsumerContainer>
  );
};

export default LoggedInContainer;
