import React from 'react'

import Popover from './shared/Popover'
import CheckoutCartModal from './Checkout/cartModal/CheckoutCartModal'

const CartPopover = ({ ...props }) => (
  <Popover {...props}>
    <CheckoutCartModal />
  </Popover>
)

export default CartPopover