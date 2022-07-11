import React from 'react'
import { Link, Routes, useSession } from "blitz"
import PropTypes from 'prop-types'
import { useFormState } from 'react-final-form'

import { styled } from "integrations/material-ui"
import { formatNumberToCurrency } from "app/helpers"
import { convertDayToInt, todAM, todPM } from 'app/helpers'

import Form, { DatePicker, Select } from 'app/core/components/form'
import Button from 'app/core/components/shared/Button'
import Typography from 'app/core/components/shared/Typography'
import CartItems from '../cartItems'

const Root = styled('div')({
  padding: 2
});

const Content = styled('div')({
  width: "100%"
});

const CartItemsContainer = (props) => {
  const formState = useFormState()
  const time = [...todAM, ...todPM]
  const selectedEventDate = formState.values?.eventDate
  const selectedDayOfWeek = selectedEventDate?.getDay()
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
    const selectedTime = props.hours.find(hourBlock =>
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
          <Typography variant="subtitle1">Date</Typography>
          <DatePicker
            name="eventDate"
            disablePast
            required
            views={['month', 'day']}
            inputVariant="outlined"
            shouldDisableDate={disableDaysOff}
          />

          <Typography variant="subtitle1">Time</Typography>
          <Select
            name="eventTime"
            items={availableTime}
            required
          />
        </React.Fragment>
      )}

      {props.cartItems?.length > 0 && (
        <Content>
          <Typography variant="h6" sx={{ mt: 4, fontWeight: '545' }}>Your Items</Typography>
          <CartItems selectedCartItems={props.cartItems} />
          <Typography variant="h6" sx={{ my: 4 }}>Total: {formatNumberToCurrency(props.total)}</Typography>
          {props.buttonText && (
            <Link href={Routes.Checkout({
              cid: 1,
              eventDate: selectedEventDate && new Date(selectedEventDate).toISOString(),
              eventTime: formState.values?.eventTime
            })}>
              <Button
                variant="contained"
                color="primary"
                size="large"
              >
                {props.buttonText}
              </Button>
            </Link>
          )}
        </Content>
      )}
    </React.Fragment>
  )
}

const CartSummary = (props) => {
  const session = useSession();
  const { checkoutPage, buttonText, dishes } = props;
  const cartItems = session?.cart?.pendingCartItems;
  const total = session?.cart?.total || 0;
  const hours = dishes[0]?.chef?.hours

  return (
    <Root>
      <Form>
        {buttonText && (
          <Typography fontWeight="550" variant="h5">Your Reservation</Typography>
        )}
        <CartItemsContainer
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
