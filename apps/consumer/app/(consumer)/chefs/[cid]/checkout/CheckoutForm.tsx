"use client";

import { Controller } from "react-hook-form";
import * as z from "zod";

import { Button } from "app/components/ui/button";
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

import createCheckoutMutation from "app/actions/mutations/createCheckout";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import {
	formatNumberToCurrency,
	getConsumerCartTotal,
	getConsumerServiceFee,
} from "app/lib/utils";

import { CartItem } from "types";

interface CheckoutFormProps {
	chefId: string;
	cartTotal: string;
	subtotal: string;
	cartItems: Array<CartItem>;
	address: string;
	eventDate: string;
	eventTime: string;
	paymentMethods: Array<any>;
}
export default function CheckoutForm(props: CheckoutFormProps) {
	const formSchema = z.object({
		selectedAddress: z.string(),
		paymentMethodId: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		selectedAddress: props.address || "",
		paymentMethodId: props.paymentMethods[0]?.id || "",
	});
	const values = form.getValues();
	console.log("props.subtotal", props.subtotal)

	const handleForm = async (input: FormData) => {
		const address = input.get("selectedAddress") as string
		const paymentMethodId = input.get("paymentMethodId") as string

		await createCheckoutMutation({
			eventDate: props.eventDate,
			eventTime: props.eventTime,
			address,
			chefId: props.chefId,
			subtotal: props.cartTotal,
			serviceFee: props.cartTotal,
			total: props.cartTotal,
			paymentMethodId,
			cartItems: props.cartItems,
		});
	}

	return (
		<form action={handleForm} className="space-y-8">
			<Controller
				control={form.control}
				name="selectedAddress"
				render={({ field }) => (
					<Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
						<SelectTrigger>
							<SelectValue placeholder="Select an address for your event." />
						</SelectTrigger>
						<SelectContent>
							{["0"].map((address, i) => (
								<SelectItem key={address} value={address}>
									{address}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>
			<Controller
				control={form.control}
				name="paymentMethodId"
				render={({ field }) => (
					<Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
						<SelectTrigger>
							<SelectValue placeholder="Select a card for payment." />
						</SelectTrigger>
						<SelectContent>
							{props.paymentMethods.map((paymentMethod, i) => (
								<SelectItem key={paymentMethod.id} value={paymentMethod.id}>
									{paymentMethod.card.last4}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			/>

			<div>
				<div className="grid grid-cols-2 mb-2">
					<p className="text-muted-foreground">Subtotal</p>
					<p>{formatNumberToCurrency(Number(props.cartTotal))}</p>
				</div>
				<div className="grid grid-cols-2 mb-2">
					<p className="text-muted-foreground">Taxes</p>
					<p>{formatNumberToCurrency(10)}</p>
				</div>
				<div className="grid grid-cols-2 mb-2 pb-2 border-b-2">
					<p className="text-muted-foreground">Service fee</p>
					<p>
						{formatNumberToCurrency(getConsumerServiceFee(props.subtotal))}
					</p>
				</div>
				<div className="grid grid-cols-2">
					<p>Total</p>
					<p>
						{formatNumberToCurrency(getConsumerCartTotal(props.subtotal))}
					</p>
				</div>
			</div>

			<small className="block">
				* A hold will be put on your card until the chef confirms your order.
			</small>

			<Button
				className="mt-4"
				disabled={!values.selectedAddress || !values.paymentMethod}
			>
				Checkout
			</Button>
		</form>
	);
}
