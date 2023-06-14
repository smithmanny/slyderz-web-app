import React, { useCallback, useState } from "react";
import { CardActionArea } from '@mui/material';

import { styled } from "integrations/material-ui";

import Card, { CardContent, CardMedia } from "app/core/components/shared/Card";
import Box from "app/core/components/shared/Box";
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import MenuItemModal from "app/core/modals/MenuItemModal";

const MuiCardMedia = styled(CardMedia)`
  & .MuiCardMedia-img {
    object-fit: contain;
  }
`

const Menu = (props) => {
  const { dishes } = props;
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
      <Grid item xs={12}>
        <Grid container item spacing={2}>
          {dishes.map((item, index) => (
            <Grid key={index} item xs={12} lg={6}>
              <Card
                sx={{ display: 'flex', justifyContent: 'space-between' }}
                onClick={() => openMenuItemModal(item)}
              >
                <CardActionArea>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography fontSize={18} fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" fontWeight={550}>
                        ${item.price} /person
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Button
                        variant="outlined"
                        fullWidth={false}
                        sx={{
                          width: 200
                        }}
                      >
                        Add to cart
                      </Button>
                    </CardContent>
                  </Box>
                </CardActionArea>
              <MuiCardMedia
                component="img"
                sx={{ width: 200 }}
                image={item.image[0].imageUrl}
                alt="Live from space album cover"
              />
            </Card>
          </Grid>
          ))}
        </Grid>
      </Grid>

      {menuItem && (
        <MenuItemModal
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         menuItem={menuItem}
         show={openModal}
         onClose={closeMenuItemModal}
       />
      )}
    </Grid>
  );
};

export default Menu;
