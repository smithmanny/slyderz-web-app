import { useCallback, useState } from "react";

import MenuStyles from "./styles";

import Card, { CardMedia } from "app/core/components/shared/Card";
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import MenuItemModal from "app/core/modals/MenuItemModal";
import React from "react";

const Menu = ({ dishes }) => {
  const classes = MenuStyles();
  const [menuItem, setMenuItem] = useState(null);
  const [openModal, setModalOpen] = useState(false);
  
  const openMenuItemModal = useCallback((_menuItem) => {    
    setMenuItem(_menuItem)
    setModalOpen(true);
  }, []);
  const closeMenuItemModal = useCallback(() => {
    setModalOpen(false);
    setMenuItem(null)
  }, []);

  const renderDishDescription = (description) => `${description.substring(0, 250)}...`

  return (
    <Grid container spacing={2}>
      {dishes.map((menuItem) => (
        <Grid key={menuItem.id} className={classes.item} item xs={12}>
          <Card className={classes.root} onClick={() => openMenuItemModal(menuItem)}>
            <CardMedia
              className={classes.dishPicture}
              image="/logo.png" 
              title="Menu Item" 
            />
            <div className={classes.content}>
              <span className={classes.flex}>
                <Typography variant="h6" className={classes.title}>
                  {menuItem.name}
                </Typography>

                {/* Price */}
                <Typography className={classes.price}>
                  {`$${menuItem.price} / `}
                  <span>serving</span>
                </Typography>
              </span>

              <span className={classes.dishDescription}>
                <Typography>
                  {renderDishDescription("There was a feature request in my current company, product team requested a table component which should order columns in ascending or descending way when clicking the column’s title. At the end of this post, you’ll see the working POC. There may be so many things to improve in the aspect of code quality but do not forget, this is just a POC. I’m looking forward to your responses to the code.")}
                </Typography>
              </span>

              <span className={classes.orderButton}>
                <Button
                  color="primary"
                  onClick={() => openMenuItemModal(menuItem)}
                  variant="contained"
                >
                  Add to cart
                </Button>
              </span>
            </div>
          </Card>
        </Grid>
      ))}
      <MenuItemModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        menuItem={menuItem}
        show={openModal}
        onClose={closeMenuItemModal}
      />
    </Grid>
  );
};

export default Menu;
