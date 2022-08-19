import React from "react";

import { readableDate } from "app/helpers/dateHelpers"

import Typography from 'app/core/components/shared/Typography'
import Box from "app/core/components/shared/Box";

const OrderItems = (props) => {
  const { order } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          textAlign: 'left',
          mb: 4
        }}
        >
        <Typography gutterBottom>
          <strong>Confirmation#:</strong> {order.confirmationNumber}
        </Typography>
        <Typography gutterBottom>
          <strong>Event Date:</strong> {readableDate(order.eventDate)}
        </Typography>
        <Typography gutterBottom>
          <strong>Event Time:</strong> {order.eventTime}
        </Typography>
      </Box>
      {order.dishes.map(item => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography>{item.dish.name}</Typography>

          <Typography>
            ${item.quantity * item.dish.price}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

export default OrderItems