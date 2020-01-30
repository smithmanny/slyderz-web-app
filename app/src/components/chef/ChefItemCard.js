import React from 'react';

import Typography from '../core/Typography';
import ChefItemCardModal from './ChefItemCardModal';
import ChefItemCardStyles from '../../assets/styles/consumer/chef/chefItemCardStyles';

const ChefItemCard = ({ description, name, }) => {
  const classes = ChefItemCardStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <article className={classes.card}>
      <span>
        <img src="/food.jpg" alt="Food" />
      </span>
      <section className={classes.content}>
        <Typography className={classes.title} variant="body1" gutterBottom>
          {name}
        </Typography>
        {/* Description */}
        <Typography className={classes.description} gutterBottom paragraph>
          {description}
        </Typography>
        <Typography className={classes.price}>$10</Typography>
      </section>
      <div
        tabIndex={0}
        aria-labelledby="dish link"
        role="button"
        onKeyDown={handleOpen}
        onClick={handleOpen}
        className={classes.link}
      />
      <ChefItemCardModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      />
    </article>
  );
};

export default ChefItemCard;
