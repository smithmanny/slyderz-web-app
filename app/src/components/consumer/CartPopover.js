import React from 'react'

import Popover from '../shared/Popover'
import CheckoutCartModal from './checkout/cartModal/CheckoutCartModal'

const CartPopover = ({ ...props }) => (
  <Popover {...props}>
    <CheckoutCartModal />
  </Popover>
)

export default CartPopover