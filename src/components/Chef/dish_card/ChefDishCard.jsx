import React from 'react';

import ChefDishCardStyles from './styles';
import ChefItemCardModal from '../dish_card_modal';

import Grid from '../../shared/Grid';
import Typography from '../../shared/Typography';

const ChefDishCard = ({ dishes }) => {
  const classes = ChefDishCardStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    dishes.map(dish => (
      <article className={classes.chefDish}>
        <Grid container>
          <Grid item xs={9}>
            <Typography 
              className={classes.title} 
              variant="body1" 
              gutterBottom
            >
              {dish.name}
            </Typography>
            {/* Description */}
            <Typography 
              className={classes.description} 
              gutterBottom 
              paragraph
            >
              {dish.description}
            </Typography>
            <Typography className={classes.price}>$10</Typography>
          </Grid>
          <Grid item xs={3}>
            <img
              alt="Food"
              className={classes.dishPhoto}
              src="/food.jpg"
            />
          </Grid>
        </Grid>
        <ChefItemCardModal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        />
      </article>
    ))
      /* <div
        tabIndex={0}
        aria-labelledby="dish link"
        role="button"
        onKeyDown={handleOpen}
        onClick={handleOpen}
        className={classes.link}
      /> */
  );
};

export default ChefDishCard;
