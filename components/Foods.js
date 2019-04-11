import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import fetchFoodsQuery from '../lib/gql/query/food/fetchFoodsQuery.gql';

const styles = theme => ({
  orderWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    paddingBottom: theme.spacing.unit * 5,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

const Foods = ({ classes }) => (
  <div className={classes.orderWrapper}>
    <Query query={fetchFoodsQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          console.log(error);
          return (
            <div> Error :( </div>
          );
        }


        return (
          <GridList className={classes.gridList} cols={4} spacing={16}>
            {data.foods.map(food => (
              <GridListTile key={food.title}>
                <img src={food.image} alt={food.title} />
                <GridListTileBar
                  title={food.title}
                  classes={{
                    root: classes.titleBar,
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        );
      }}
    </Query>
  </div>
);

Foods.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Foods);
