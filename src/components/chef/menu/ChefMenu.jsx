import React from "react";
import { useDispatch } from "react-redux";

import Card, { CardContent } from "../../shared/Card";
import DishCardContainerStyles from "./styles";
import DishCardModal from "../DishCardModal";
import { addItem as addItemToCart } from "../../../libs/redux/reducers/cartReducer";

import Button from "../../shared/Button";
import Grid from "../../shared/Grid";
import Typography from "../../shared/Typography";

const DishCardContainer = ({ dishes }) => {
  const dispatch = useDispatch();
  const classes = DishCardContainerStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container spacing={2}>
      {dishes.map((dish) => (
        <Grid key={dish.id} className={classes.item} item xs={12} md={6}>
          <Card onClick={handleOpen}>
            <CardContent
              classes={{ root: classes.root }}
              className={classes.content}
            >
              <div className={classes.dishPicture} />
              <div className={classes.dishInfo}>
                <Typography variant="h5" className={classes.title}>
                  {dish.name}
                </Typography>
                <Typography variant="subtitle1">{dish.description}</Typography>
                <span className={classes.addToCartSection}>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(
                        addItemToCart({
                          chef: "Shakhor",
                          selectedCartItem: {
                            ...dish,
                            quantity: 1,
                          },
                        })
                      );
                    }}
                    variant="contained"
                  >
                    Add to cart
                  </Button>
                  <Typography className={classes.price}>
                    {`$${dish.price} / `}
                    <span>serving</span>
                  </Typography>
                </span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <DishCardModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      />
    </Grid>
  );
};

export default DishCardContainer;
