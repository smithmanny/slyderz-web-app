import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  imageDiv: {
    height: 200,
    marginBottom: theme.spacing(1)
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    backgroundSize: 'cover'
  }
});

class ChefCard extends React.Component {
  static getStartingDishImage(dishes) {
    if (!dishes) {
      return 'https://res.cloudinary.com/slyderz/image/upload/v1558340715/lily-banse-365344-unsplash_t1jsg2.jpg';
    }

    return dishes[0].dishImage;
  }

  static getStartingDishPrice(dishes) {
    if (!dishes) {
      return 'Message for pricing.';
    }

    const price = dishes[0].pricePerPerson;
    return `$${price} per person`;
  }

  static getStartingDishType(dishes) {
    if (!dishes) {
      return '';
    }

    const type = dishes[0].dishType;
    return type;
  }

  render() {
    const { classes, chefs } = this.props;
    return (
      <Grid container spacing={3}>
        {chefs.map(chef => (
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
            <div>
              <div className={classes.imageDiv}>
                <img
                  src={ChefCard.getStartingDishImage(chef.dishes)}
                  alt={chef.firstName}
                  className={classes.image}
                />
              </div>
              <Typography variant="body2" color="primary">
                {ChefCard.getStartingDishType(chef.dishes)}
              </Typography>
              <Typography variant="h6" color="inherit" gutterBottom>
                {chef.firstName} {chef.lastName}
              </Typography>
              <Typography variant="body2" color="inherit" gutterBottom>
                {ChefCard.getStartingDishPrice(chef.dishes)}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }
}

ChefCard.defaultProps = {
  chefs: []
};

ChefCard.propTypes = {
  classes: PropTypes.shape().isRequired,
  chefs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  )
};

export default withStyles(styles)(ChefCard);
