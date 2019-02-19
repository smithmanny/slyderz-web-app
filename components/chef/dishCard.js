import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { SelectField } from '../../components/form/Form';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  addToOrder: {
    marginLeft: 'auto',
  },
});

const DishCard = ({ classes, name }) => {
  return (
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
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.

          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="body1">
                $50/per person
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <SelectField name={name} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

DishCard  .propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DishCard);
