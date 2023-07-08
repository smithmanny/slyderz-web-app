import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import type { DaysOfWeekTypeEnum } from "@prisma/client";
import Image from "next/image";

import { formatNumberToCurrency } from "app/utils/time";
import { convertDayToInt, todAM, todPM } from "app/utils/time";
import { Cart, CONSUMER_SERVICE_FEE } from "types";
import { trpc } from "server/utils/trpc";

import Form, { DatePicker, Select } from "app/core/components/form";
import Button from "app/core/components/shared/Button";
import Box from "app/core/components/shared/Box";
import Grid from "app/core/components/shared/Grid";
import Typography from "app/core/components/shared/Typography";
import CartItems from "../cartItems";

type HoursType = {
  daysOfWeek: Array<DaysOfWeekTypeEnum>;
  startTime: string | null;
  endTime: string | null;
};
type CartSummaryType = {
  chefId: string;
  hours: Array<HoursType>;
  nextAvailableChefDay?: Date;
};

const CartSummary = (props: CartSummaryType) => {
  const { chefId, hours } = props;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data } = trpc.cart.getUserCart.useQuery();
  const createCart = trpc.cart.createCart.useMutation({
    onSuccess: () => {
      return router.push(`/chefs/${chefId}/checkout`);
    },
  });

  const cart: Cart = {
    items: data?.items || [],
    total: data?.total || 0,
  };
  const isCheckoutPage = router.asPath.includes("checkout");
  const time = useMemo(() => [...todAM, ...todPM], []);
  const [selectedEventDate, setSelectedEventDate] = useState<Date>(new Date());
  const [selectedEventTime, setSelectedEventTime] = useState("");
  const cartItems = cart.items;
  const total = cart.total;
  const orderServiceFee: number = total * CONSUMER_SERVICE_FEE;

  useEffect(() => {
    if (props.nextAvailableChefDay) {
      setSelectedEventDate(props.nextAvailableChefDay);
    }
  }, [props.nextAvailableChefDay]);

  const handleEventDate = (date: Date) => {
    setSelectedEventDate(date);
  };
  const handleEventTime = (event) => {
    setSelectedEventTime(event.target.value);
  };

  const disableDaysOff = useCallback(
    (date: Date) => {
      const daysOfWeek: Array<number> = [0, 1, 2, 3, 4, 5, 6];
      const workingDays: Array<number> = [];

      hours.map((hourBlock) =>
        hourBlock.daysOfWeek.map((day) => {
          const matchedDay = convertDayToInt(day);
          workingDays.push(matchedDay);
        }),
      );

      const offDays = daysOfWeek.filter((day) => !workingDays.includes(day));

      return offDays.includes(date.getDay());
    },
    [hours],
  );

  const getAvailableTime = useCallback(() => {
    const selectedDayOfWeek: number = selectedEventDate.getDay();
    const selectedTime = hours.find((hourBlock) =>
      hourBlock.daysOfWeek.find(
        (dayOfWeek) => convertDayToInt(dayOfWeek) === selectedDayOfWeek,
      ),
    );
    const startTime = time.find((t) => t.label === selectedTime?.startTime);
    const endTime = time.find((t) => t.label === selectedTime?.endTime);

    if (startTime && endTime) {
      const startTimeIndex = time.indexOf(startTime);
      const endTimeIndex = time.indexOf(endTime);
      const availableTime = time.slice(startTimeIndex, endTimeIndex + 1);

      return availableTime;
    }

    return [];
  }, [hours, time, selectedEventDate]);

  const availableTime = getAvailableTime();

  return (
    <Box sx={{ p: 2 }}>
      <Form
        initialValues={{
          eventDate: selectedEventDate,
        }}
      >
        <Grid item>
          <Typography fontWeight="550" variant="h5">
            Your Reservation
          </Typography>
        </Grid>
        <DatePicker
          name="eventDate"
          disablePast
          required
          label="Date"
          views={["month", "day"]}
          inputVariant="outlined"
          shouldDisableDate={disableDaysOff}
          onChange={handleEventDate}
        />
        <Select
          name="eventTime"
          label="Time"
          items={availableTime?.map((time, index) => ({
            label: time.label,
            value: time.value,
          }))}
          required
          onChange={handleEventTime}
          value={selectedEventTime}
        />

        {(cartItems?.length === 0 || cartItems === undefined) && (
          <Grid item xs={12} textAlign="center">
            <Image
              alt="Empty cart"
              width={85}
              height={85}
              src="/empty-cart.svg"
            />
            <Typography fontWeight="550" variant="h5">
              Your cart is empty
            </Typography>
          </Grid>
        )}

        {cartItems?.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>
              Your Items
            </Typography>
            <CartItems
              selectedCartItems={cartItems}
              isCheckoutPage={isCheckoutPage}
            />

            <Typography variant="subtitle1" sx={{ mt: 4, fontWeight: "bold" }}>
              Subtotal:
              <span style={{ fontWeight: "normal" }}>
                {formatNumberToCurrency(total)}
              </span>
            </Typography>
            <Typography variant="subtitle1" sx={{ my: 0, fontWeight: "bold" }}>
              Service Fee:
              <span style={{ fontWeight: "normal" }}>
                {formatNumberToCurrency(orderServiceFee)}
              </span>
            </Typography>
            <Typography variant="subtitle1" sx={{ mb: 4, fontWeight: "bold" }}>
              Total:
              <span style={{ fontWeight: "normal" }}>
                {formatNumberToCurrency(total + orderServiceFee)}
              </span>
            </Typography>

            <Button
              label="Add to cart"
              variant="contained"
              color="primary"
              size="large"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                try {
                  await createCart.mutateAsync({
                    eventDate: selectedEventDate,
                    eventTime: selectedEventTime,
                    chefId,
                  });
                } catch (err: any) {
                  console.log("Failed to create cart", err.message);
                  enqueueSnackbar(err.message, {
                    variant: "error",
                  });
                }
              }}
              disabled={!selectedEventDate || !selectedEventTime}
            >
              Checkout
            </Button>
          </Grid>
        )}
      </Form>
    </Box>
  );
};

export default CartSummary;
