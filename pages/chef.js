import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';

import Layout from '../components/Layout';

const useStyles = theme => ({
  cookLogo: {
    marginBottom: theme.spacing.unit * 2,
  },
  orderWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  chefImage: {
    height: '100%',
  },
  paper: {
    height: 250,
    width: 220,
  },
  media: {
    height: '100%',
  },
});

const Chef = ({ classes }) => (
  <Layout>
    <Grid container spacing={12}>
      <Grid item xs={12} sm={4}>
        <Grid item xs={12} className={classes.cookLogo}>
          <Paper className={classes.paper}>
            <CardMedia className={classes.media} image="/static/food.jpg" title="Contemplative Reptile" />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="inherit" gutterBottom>
            Shakhor Smith
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtle1" color="inherit" gutterBottom>
            Atlanta, GA
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Grid item xs={12}>
          <Typography variant="body1" color="inherit" gutterBottom>
            Short Bio
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.section}>
          <Typography variant="h6" color="inherit" gutterBottom>
            Dishes
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </Layout>
);

Chef.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Chef);
