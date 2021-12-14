import { useCallback, useState } from "react";

import { styled } from "integrations/material-ui";

import Card, { CardMedia } from "app/core/components/shared/Card";
import Button from "app/core/components/shared/Button";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import MenuItemModal from "app/core/modals/MenuItemModal";
import React from "react";

const DishDescription = styled('span')({
  flex: 1
})

const Content = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  flex: 1,
}))

const OrderButton = styled('span')({
  marginLeft: 'auto'
})

const Flex = styled('span')({
  display: "flex",
  justifyContent: "space-between",
})

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

  const renderDishDescription = (description) => `${description.substring(0, 250)}...`

  return (
    <Grid container spacing={2}>
      {dishes.map((menuItem) => (
        <Grid key={menuItem.id} sx={{ mb: 2 }} item xs={12}>
          <Card
            onClick={() => openMenuItemModal(menuItem)}
            sx={{
              flexDirection: {
                md: 'column'
              },
              maxWidth: {
                md: 350
              },
              margin: {
                md: 'auto'
              },
              height: {
                md: 'auto'
              },
              display: 'flex',
              minHeight: 200
            }}
          >
            <CardMedia
              sx={{
                backgroundSize: "cover",
                borderRadius: '1, 1, 0, 0',
                height: {
                  md: 200
                },
                width: {
                  xs: 200,
                  md: '100%'
                },
                marginBottom: 1,
              }}
              image="/logo.png"
              title="Menu Item"
            />
            <Content>
              <Flex>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  {menuItem.name}
                </Typography>

                {/* Price */}
                <Typography
                  sx={{
                    "& span": {
                      color: 'text.secondary',
                    },
                    fontWeight: 400,
                    justifyContent: "flex-end",
                  }}
                >
                  {`$${menuItem.price} / `}
                  <span>serving</span>
                </Typography>
              </Flex>

              <DishDescription>
                <Typography>
                  {renderDishDescription("There was a feature request in my current company, product team requested a table component which should order columns in ascending or descending way when clicking the column’s title. At the end of this post, you’ll see the working POC. There may be so many things to improve in the aspect of code quality but do not forget, this is just a POC. I’m looking forward to your responses to the code.")}
                </Typography>
              </DishDescription>

              <OrderButton>
                <Button
                  color="primary"
                  onClick={() => openMenuItemModal(menuItem)}
                  variant="contained"
                >
                  Add to cart
                </Button>
              </OrderButton>
            </Content>
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
