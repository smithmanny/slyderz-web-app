import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { SelectField } from '../form/Form';

const styles = theme => ({
  card: {
    maxWidth: 350,
    margin: 'auto'
  },
  media: {
    height: 200
  },
  addToOrder: {
    marginLeft: 'auto'
  }
});

const DishCard = ({ classes, name, price }) => (
  <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image="/static/food.jpg"
      title="Paella dish"
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Dish Title Goes Here
      </Typography>
      <Typography component="p">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like. This impressive paella is a perfect party dish and
        a fun meal to cook together with your guests. Add 1 cup of frozen peas
        along with the mussels, if you like.
      </Typography>
    </CardContent>
    <CardActions>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="body1">{`$${price}/per person`}</Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary">
            Add To Cart
          </Button>
        </Grid>
      </Grid>
    </CardActions>
  </Card>
);

DishCard.defaultProps = {
  name: null
};

DishCard.propTypes = {
  classes: PropTypes.shape().isRequired,
  name: PropTypes.string,
  price: PropTypes.number
};

export default withStyles(styles)(DishCard);
