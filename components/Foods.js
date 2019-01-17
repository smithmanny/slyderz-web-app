import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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

export const allFoodsQuery = gql`
  query {
    foods {
      title
      image {
        url
      }
    }
  }
`;

const Foods = ({ classes }) => (
  <div className={classes.orderWrapper}>
    <Query query={allFoodsQuery}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error :(</div>;

        return (
          <GridList className={classes.gridList} cols={3} spacing={16}>
            {data.foods.map(food => (
              <GridListTile key={food.title}>
                <img src={`/api/${food.image.url}`} alt={food.title} />
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
