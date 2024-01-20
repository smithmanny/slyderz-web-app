"use client";

import { useCallback, useMemo } from "react";
import * as z from "zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";

import { CartItem } from "./CartItem";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";
import { Button } from "app/components/ui/button";
import { Calendar } from "app/components/ui/calendar";

import { cn } from "app/lib/utils";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import { convertDayToInt, todAM, todPM } from "app/utils/time";
import { createCartMutation } from "app/actions/mutations/createCart";

import type { DaysOfWeekTypeEnum } from ".prisma/client";
import type { Cart } from "types";

type HoursType = {
  daysOfWeek: Array<DaysOfWeekTypeEnum>;
  startTime: string | null;
  endTime: string | null;
};
interface CartProps {
  hours: Array<HoursType>;
  cart: Cart;
  chefId: string;
}
export default function Cart(props: CartProps) {
  const formSchema = z.object({
    eventDate: z.string(),
    eventTime: z.string(),
  });
  const form = useSlyderzForm(formSchema, {
    eventDate: "",
    eventTime: "",
  });

  const disableDaysOff = useCallback(
    (date: Date) => {
      const daysOfWeek: Array<number> = [0, 1, 2, 3, 4, 5, 6];
      const workingDays: Array<number> = [];

      props.hours.map((hourBlock) =>
        hourBlock.daysOfWeek.map((day) => {
          const matchedDay = convertDayToInt(day);
          workingDays.push(matchedDay);
        }),
      );

      const offDays = daysOfWeek.filter((day) => !workingDays.includes(day));

      return offDays.includes(date.getDay());
    },
    [props.hours],
  );

  return (
    <Form {...form}>
      <form action="/" className="space-y-8">
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => disableDaysOff(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <EventTime form={form} hours={props.hours} />

        {props.cart.items.length === 0 ? (
          <div className="flex justify-center flex-col items-center">
            <Image
              alt="Empty cart"
              width={85}
              height={85}
              src="/empty-cart.svg"
            />
            <h6 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              Your cart is empty
            </h6>
          </div>
        ) : (
          <div>
            {props.cart.items.map((item, i) => (
              <CartItem
                key={`${item.dishId}-${i}`}
                cartId={item.id}
                name={item.name}
                price={item.price}
                dishId={item.dishId}
                quantity={item.quantity}
              />
            ))}
          </div>
        )}

        {props.cart.items.length !== 0 && (
          <Button
            className="mt-4"
            disabled={!form.getValues().eventTime}
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              const { eventDate, eventTime } = form.getValues();
              await createCartMutation({
                eventDate,
                eventTime,
                chefId: props.chefId,
              });
            }}
          >
            Checkout
          </Button>
        )}
      </form>
    </Form>
  );
}

function EventTime(props) {
  const time = useMemo(() => [...todAM, ...todPM], []);
  const values = props.form.getValues();

  const getAvailableTime = useCallback(() => {
    /*
     * 1. Get selected day
     * 2. Find chef hour block for selected day
     * 3. Get the earliest/latest time chef is available
     * 4. Return times
     */
    const selectedDayOfWeek: number = new Date(values.eventDate).getDay();
    const selectedTime = props.hours.find((hourBlock) =>
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
  }, [props.hours, time, values.eventDate]);

  const availableTime = getAvailableTime();

  return (
    <FormField
      control={props.form.control}
      name="eventTime"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Event Time</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an event date to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {availableTime.map((hour, i) => (
                <SelectItem key={`${hour}-${i}`} value={hour.value}>
                  {hour.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
