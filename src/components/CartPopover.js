import React from 'react'

import Popover from './shared/Popover'
import CheckoutCartModal from './checkout/cart_modal/CheckoutCartModal'

const CartPopover = ({ ...props }) => (
  <Popover {...props}>
    <CheckoutCartModal />
  </Popover>
)

export default CartPopover