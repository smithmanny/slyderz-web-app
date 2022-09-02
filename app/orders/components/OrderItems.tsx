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
          <strong>Event Date:</strong> {readableDate(new Date(order.eventDate))}
        </Typography>
        <Typography gutterBottom>
          <strong>Event Time:</strong> {order.eventTime}
        </Typography>
      </Box>
      {order.dishes.map(item => (
        <Box
          key={item.id}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography>{item.dish.name}</Typography>
          {/* TODO: Fix rendering dish price */}
          {/* <Typography>
            ${item.quantity * item.dish.price}
          </Typography> */}
        </Box>
      ))}
    </Box>
  )
}

export default OrderItems