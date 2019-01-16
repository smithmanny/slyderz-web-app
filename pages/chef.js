import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';

import Layout from '../components/Layout';

const useStyles = theme => ({
  root: {
    flexGrow: 1,
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
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  section: {
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 5,
  },
  chefImage: {
    height: '100%',
  },
  paper: {
    height: 205,
    marginBottom: theme.spacing.unit,
  },
});

const Chef = ({ classes }) => (
  <Layout>
    <section className={classes.section}>
      <Typography variant="h5" color="inherit" gutterBottom>
        Chefs Page
      </Typography>
    </section>
  </Layout>
);

Chef.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(useStyles)(Chef);
