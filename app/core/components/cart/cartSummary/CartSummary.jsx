import Link from "next/link";
import { Routes } from "@blitzjs/next";
import { useSession } from "@blitzjs/auth";
import React from 'react'
import PropTypes from 'prop-types'
import { useFormState } from 'react-final-form'

import { styled } from "integrations/material-ui"
import { formatNumberToCurrency } from "app/utils/time"
import { convertDayToInt, todAM, todPM } from 'app/utils/time'
import { CONSUMER_SERVICE_FEE } from "types";

import Form, { DatePicker, Select } from 'app/core/components/form'
import Button from 'app/core/components/shared/Button'
import Grid from 'app/core/components/shared/Grid'
import Typography from 'app/core/components/shared/Typography'
import CartItems from '../cartItems'

const Root = styled('div')({
  padding: 2
});

const CartItemsContainer = (props) => {
  const formState = useFormState()
  const time = [...todAM, ...todPM]
  const selectedEventDate = formState.values?.eventDate
  const selectedDayOfWeek = selectedEventDate?.getDay()
  const orderServiceFee = props.total * CONSUMER_SERVICE_FEE
  let startTime
  let startTimeIndex
  let endTime
  let endTimeIndex
  let availableTime

  const disableDaysOff = (date) => {
    const daysOfWeek = [0, 1, 2, 3, 4, 5, 6]
    const workingDays = []

    props.hours.map(hourBlock => hourBlock.daysOfWeek.map(day => {
      const matchedDay = convertDayToInt(day)
      workingDays.push(matchedDay)
    }))

    const offDays = daysOfWeek.filter(day => !workingDays.includes(day))

    return offDays.includes(date.getDay())
  }

  if (!props.checkoutPage) {
    const selectedTime = props.hours?.find(hourBlock =>
      hourBlock.daysOfWeek.find(dayOfWeek =>
        convertDayToInt(dayOfWeek) === selectedDayOfWeek
      )
    )
    startTime = time.find(t => t.key === selectedTime?.startTime)
    startTimeIndex = time.indexOf(startTime)
    endTime = time.find(t => t.key === selectedTime?.endTime)
    endTimeIndex = time.indexOf(endTime)
    availableTime = time.slice(startTimeIndex, endTimeIndex + 1)
  }

  return (
    <React.Fragment>
      {!props.checkoutPage && (
        <React.Fragment>
          <DatePicker
            name="eventDate"
            disablePast
            required
            label="Date"
            views={['month', 'day']}
            inputVariant="outlined"
            shouldDisableDate={disableDaysOff}
          />
          <Select
            name="eventTime"
            label="Time"
            items={availableTime}
            required
          />
        </React.Fragment>
      )}

      {(props.cartItems?.length === 0 || props.cartItems === undefined) && (
        <Grid item xs={12}>
          <Typography fontWeight="550" variant="h5">Your cart is empty</Typography>
        </Grid>
      )}

      {props.cartItems?.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 4, fontWeight: 'bold' }}>Your Items</Typography>
          <CartItems selectedCartItems={props.cartItems} />

          <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: 'bold' }}>
            Subtotal:
            <span style={{ fontWeight: 'normal' }}>
                {formatNumberToCurrency(props.total)}
            </span>
          </Typography>
          <Typography variant="subtitle1" sx={{ my: 0, fontWeight: 'bold' }}>
            Service Fee:
            <span style={{ fontWeight: 'normal' }}>
              {formatNumberToCurrency(orderServiceFee)}
            </span>
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, fontWeight: 'bold' }}>
            Total:
            <span style={{ fontWeight: 'normal' }}>
              {formatNumberToCurrency(props.total + orderServiceFee)}
            </span>
            </Typography>
          {props.buttonText && (
            <Link href={Routes.Checkout({
              cid: props.chefId,
              eventDate: selectedEventDate && new Date(selectedEventDate).toISOString(),
              eventTime: formState.values?.eventTime
            })}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={(!selectedEventDate || !formState.values?.eventTime)}
              >
                {props.buttonText}
              </Button>
            </Link>
          )}
        </Grid>
      )}
    </React.Fragment>
  )
}

const CartSummary = (props) => {
  const session = useSession();
  const { chefId, checkoutPage, buttonText, dishes } = props;
  const cartItems = session?.cart?.pendingCartItems;
  const total = session?.cart?.total || 0;
  const hours = dishes[0]?.chef?.hours

  return (
    <Root>
      <Form>
        {buttonText && (
          <Grid item>
            <Typography fontWeight="550" variant="h5">Your Reservation</Typography>
          </Grid>
        )}
        <CartItemsContainer
          chefId={chefId}
          buttonText={buttonText}
          checkoutPage={checkoutPage}
          cartItems={cartItems}
          hours={hours}
          total={total}
        />
      </Form>
    </Root>
  );
};

CartSummary.defaultProps = {
  checkoutPage: false,
  dishes: []
}

CartSummary.PropTypes = {
  checkoutPage: PropTypes.bool,
  dishes: PropTypes.array,
}

export default CartSummary;
