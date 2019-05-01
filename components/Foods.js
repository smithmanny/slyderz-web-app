import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Section from './shared/Section';
import fetchCuisinesQuery from '../lib/gql/query/cuisines/fetchCuisinesQuery.gql';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
});

const Foods = ({ classes }) => (
  <Section>
    <Query query={fetchCuisinesQuery}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          console.log(error);
          return <div> Error :( </div>;
        }

        return (
          <GridList className={classes.gridList} cols={4} spacing={16}>
            {data.cuisines.map(cuisine => (
              <GridListTile key={cuisine.name}>
                <img src={cuisine.image} alt={cuisine.name} />
                <GridListTileBar
                  title={cuisine.name}
                  classes={{
                    root: classes.titleBar
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        );
      }}
    </Query>
  </Section>
);

Foods.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(Foods);
