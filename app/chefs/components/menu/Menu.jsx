import React, { useCallback, useState } from "react";

import { styled } from "integrations/material-ui";

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card";
import Box from "app/core/components/shared/Box";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import MenuItemModal from "app/core/modals/MenuItemModal";
import CartSummary from 'app/core/components/cart/cartSummary'

const MuiCardMedia = styled(CardMedia)`
  & .MuiCardMedia-img {
    object-fit: contain;
  }
`

const Menu = ({ dishes }) => {
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

  const renderDishDescription = (description) => `${description.substring(0, 20)}...`

  return (
    <Grid
      container
      spacing={2}
      sx={{
        p: 1,
        flexDirection: {
          xs: 'column-reverse',
          md: 'row',
        }
      }}
    >
      <Grid item xs={12} md={8}>
        <Grid container item spacing={2}>
          {dishes.map((item, index) => (
            <Grid key={index} item xs={12}>
              <Card
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => openMenuItemModal(item)}
              >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="body1">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                  ${item.price}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {renderDishDescription("There was a feature request in my current company, product team requested a table component which should order columns in ascending or descending way when clicking the column’s title. At the end of this post, you’ll see the working POC. There may be so many things to improve in the aspect of code quality but do not forget, this is just a POC. I’m looking forward to your responses to the code.")}
                  </Typography>
                </CardContent>
              </Box>
              <MuiCardMedia
                component="img"
                sx={{ width: 75, mr: 2 }}
                image="/logo.png"
                alt="Live from space album cover"
              />
            </Card>
          </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <CartSummary buttonText="Checkout" />
      </Grid>
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
