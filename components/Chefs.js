import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import CHEFS_QUERY from '../lib/gql/query/chef/chefsQuery.gql';

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
  static getStartingDishImage(dishes) {
    let image = '';
    if (dishes[0].dishImage) {
      image = dishes[0].dishImage;
    }
    return image;
  }

  static getStartingDishPrice(dishes) {
    const price = dishes[0].pricePerPerson;
    return `$${price} per person`;
  }

  static getStartingDishType(dishes) {
    const type = dishes[0].dishType;
    return type;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.orderWrapper}>
          <Query query={CHEFS_QUERY}>
            {({ data, loading }) => {
              if (loading) return 'Loading...';

              return (
                <Grid container spacing={3}>
                  {data &&
                    data.chefs &&
                    data.chefs.map(chef => (
                      <Grid
                        key={chef.id}
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        onClick={e =>
                          Router.push({
                            pathname: '/chef',
                            query: { id: chef.id }
                          })
                        }
                      >
                        <Paper className={classes.paper} elevation={2}>
                          <img
                            src={Chefs.getStartingDishImage(chef.dishes)}
                            alt={chef.firstName}
                            style={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'contain'
                            }}
                          />
                        </Paper>
                        <Typography variant="body2" color="primary">
                          {Chefs.getStartingDishType(chef.dishes)}
                        </Typography>
                        <Typography variant="h6" color="inherit" gutterBottom>
                          {chef.firstName} {chef.lastName}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="inherit"
                          gutterBottom
                        >
                          {Chefs.getStartingDishPrice(chef.dishes)}
                        </Typography>
                      </Grid>
                    ))}
                </Grid>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

Chefs.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Chefs);
