import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  orderWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  section: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5)
  },
  paper: {
    height: 205,
    marginBottom: theme.spacing(1)
  }
});

const cookData = [
  {
    img: '/static/food.jpg',
    name: 'Shakhor Smith',
    specialize: 'BBQ',
    price: 50,
    city: 'Ft. Lauderdale, FL'
  },
  {
    img: '/static/food.jpg',
    name: 'Shamar Smith',
    specialize: 'Seafood',
    price: 50,
    city: 'Ft. Lauderdale, FL'
  },
  {
    img: '/static/food.jpg',
    name: 'Nicole Hollingsworth',
    specialize: 'American',
    price: 60,
    city: 'Bronx, NY'
  },
  {
    img: '/static/food.jpg',
    name: 'Johnathan Smith',
    specialize: 'Chinese',
    price: 70,
    city: 'Mount Vernon, NY'
  },
  {
    img: '/static/food.jpg',
    name: 'Jayla Smth',
    specialize: 'Burgers',
    price: 20,
    city: 'Atlanta, GA'
  }
];

const Chefs = ({ classes }) => (
  <div className={classes.section}>
    <div className={classes.orderWrapper}>
      <Grid container spacing={3}>
        {cookData.map(cook => (
          <Grid
            key={cook.name}
            item
            xs={12}
            sm={6}
            md={3}
            onClick={e =>
              Router.push({ pathname: '/chef', query: { name: cook.name } })
            }
          >
            <Paper className={classes.paper} elevation={2}>
              <img
                src={cook.img}
                alt={cook.title}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover'
                }}
              />
            </Paper>
            <Typography variant="caption" color="primary" gutterBottom>
              {cook.specialize}
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              {cook.name}
            </Typography>
            <Typography variant="caption" color="inherit" gutterBottom>
              ${cook.price} per person
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" size="small" color="primary">
            View All
          </Button>
        </Grid>
      </Grid>
    </div>
  </div>
);

Chefs.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Chefs);
