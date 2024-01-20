"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "app/components/ui/select";
import { Button } from "app/components/ui/button";

import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import { formatNumberToCurrency } from "app/utils/time";
import { getConsumerServiceFee, getConsumerCartTotal } from "app/lib/utils";
import createCheckoutMutation from "app/actions/mutations/createCheckout";

import { CartItem } from "types";
import type { Address } from ".prisma/client";

interface CheckoutFormProps {
  chefId: string;
  cartTotal: number;
  cartItems: Array<CartItem>;
  address: Address;
  eventDate: string;
  eventTime: string;
  paymentMethods: Array<any>;
}
export default function CheckoutForm(props: CheckoutFormProps) {
  const formSchema = z.object({
    selectedAddress: z.string(),
    paymentMethod: z.string(),
  });
  const form = useSlyderzForm(formSchema, {
    selectedAddress: props.address?.id || "",
    paymentMethod: props.paymentMethods[0]?.id || "",
  });
  const values = form.getValues();

  return (
    <Form {...form}>
      <form action="/" className="space-y-8">
        <FormField
          control={form.control}
          name="selectedAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event address</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an address for your event." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[props.address].map((address, i) => (
                    <SelectItem key={`${address}-${i}`} value={address.id}>
                      {address.address1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a card for payment." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {props.paymentMethods.map((paymentMethod, i) => (
                    <SelectItem
                      key={`${paymentMethod}-${i}`}
                      value={paymentMethod.id}
                    >
                      {paymentMethod.card.last4}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <div className="grid grid-cols-2 mb-2">
            <p className="text-muted-foreground">Subtotal</p>
            <p>{formatNumberToCurrency(props.cartTotal)}</p>
          </div>
          <div className="grid grid-cols-2 mb-2">
            <p className="text-muted-foreground">Taxes</p>
            <p>{formatNumberToCurrency(10)}</p>
          </div>
          <div className="grid grid-cols-2 mb-2 pb-2 border-b-2">
            <p className="text-muted-foreground">Service fee</p>
            <p>
              {formatNumberToCurrency(getConsumerServiceFee(props.cartTotal))}
            </p>
          </div>
          <div className="grid grid-cols-2">
            <p>Total</p>
            <p>
              {formatNumberToCurrency(getConsumerCartTotal(props.cartTotal))}
            </p>
          </div>
        </div>

        <small className="block">
          * A hold will be put on your card until the chef confirms your order.
        </small>

        <Button
          className="mt-4"
          disabled={!values.selectedAddress || !values.paymentMethod}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            await createCheckoutMutation({
              eventDate: props.eventDate,
              eventTime: props.eventTime,
              address: values.selectedAddress,
              chefId: props.chefId,
              cartTotal: props.cartTotal,
              paymentMethodId: values.paymentMethod,
              cartItems: props.cartItems,
            });
          }}
        >
          Checkout
        </Button>
      </form>
    </Form>
  );
}
