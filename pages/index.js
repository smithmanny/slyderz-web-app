import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  InputBase,
  IconButton,
  SearchIcon,
  Typography,
  withStyles
} from '../src/components/core';
import { Container, Section } from '../src/components/layouts';

import homePageStyles from '../src/assets/styles/consumer/homePageStyles';

const Index = ({ classes }) => (
  <div>
    <section className={classes.headerRoot}>
      <img alt="Couple cooking" src="/static/Header.jpg" />
      <div className={classes.headerContent}>
        <Paper className={classes.paper}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder="Search private chefs"
            inputProps={{ 'aria-label': 'search private chefs' }}
          />
        </Paper>
      </div>
    </section>

    <Container>
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
              <CardContent className={classes.cardContent}>
                <Typography variant="button">BBQ • Atlanta</Typography>
                <div className="name">
                  <Typography variant="h6">Chef Shakhor</Typography>
                </div>
                <Typography variant="body2">Starting at $15/person</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Section>
    </Container>
  </div>
);

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(homePageStyles)(Index);
