import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  addToOrder: {
    marginLeft: 'auto',
  },
});

class DishCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

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
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Typography variant="body1">
              $50
            </Typography>
          <IconButton
            className={classes.addToOrder}
            aria-label="Add to order"
          >
            <Button
              variant="contained"
              color="secondary"
            >
              Add to order
            </Button>
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

DishCard  .propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DishCard);