import React, { useState } from 'react';
import Image from "next/image";
import PropTypes from 'prop-types'

import { trpc } from 'server/utils/trpc';

import Modal from 'app/core/components/shared/Modal'
import Button from 'app/core/components/shared/Button'
import Box from 'app/core/components/shared/Box'
import Typography from 'app/core/components/shared/Typography'

const MenuItemModal = ({ show, onClose, menuItem, ...props }) => {
  const addMenuItemToCart = trpc.cart.addMenuItemToCart.useMutation()
  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    setQuantity(prev => prev === 1 ? 1 : prev -= 1)
  }

  const increaseQuantity = () => {
    setQuantity(prev => prev += 1)
  }

  const updateCart = async () => {
    const values = {
      dishId: menuItem.id,
      chefId: menuItem.chefId,
      price: Number(menuItem.price),
      quantity,
    }

    try {
      await addMenuItemToCart.mutateAsync(values);
    } catch (e) {
      console.error('Error adding menu item to cart', e)
    } finally {
      onClose();
      setQuantity(1)
    }
  }

  return (
    <Modal
      closeModal={onClose}
      show={show}
      size="sm"
      actions={(
        <React.Fragment>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginRight: 2
            }}
          >
            <Button
              variant="text"
              onClick={decreaseQuantity}
            >
              -
            </Button>
            <Typography sx={{ px: 1 }}>{quantity}</Typography>
            <Button
              variant="text"
              onClick={increaseQuantity}
            >
              +
            </Button>
          </Box>
          <Button
            color="primary"
            variant="contained"
            onClick={updateCart}
          >
            {menuItem && `Add To Cart - $${menuItem.price * quantity}`}
          </Button>
        </React.Fragment>
      )}
      {...props}
    >
      <React.Fragment>
        <Box
          sx={{
            marginBottom: 2,
            position: 'relative',
            height: "250px",
            width: '100%'
          }}
        >
          <Image src="/logo.png" layout="fill" alt="Logo" />
        </Box>
        <Typography variant="h6">{menuItem.name}</Typography>
        <Typography sx={{ my: 2 }}>
          There was a feature request in my current company, product
          team requested a table component which should order columns in
          ascending or descending way when clicking the column’s title.
          At the end of this post, you’ll see the working POC. There may
          be so many things to improve in the aspect of code quality but
          do not forget, this is just a POC. I’m looking forward to your responses to the code.
        </Typography>

        <section>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 'bold',
              fontSize: '.95rem',
            }}
          >
            What&apos;s Included:
        </Typography>
          <Typography>3 Course meal</Typography>
        </section>
      </React.Fragment>
    </Modal>
  )
}

MenuItemModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default MenuItemModal;