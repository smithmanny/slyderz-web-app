import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import chefsQuery from '../lib/gql/query/chef/chefsQuery.gql';
import ChefCard from './chef/ChefCard';

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

class Chefs extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.orderWrapper}>
          <Query query={chefsQuery}>
            {({ data, loading }) => {
              if (loading) return 'Loading...';

              return <ChefCard chefs={data.chefs} />;
            }}
          </Query>
        </div>
      </div>
    );
  }
}

Chefs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chefs);
