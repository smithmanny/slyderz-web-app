"use client";

import { Controller } from "react-hook-form";
import * as z from "zod";

import { Button } from "app/components/ui/button";
import { Label } from "app/components/ui/label";
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
import AddressModal from "./AddressModal";

import type { address } from "drizzle/schema/user";
import type { CartItem } from "types";

type AddressType = typeof address.$inferSelect;

interface CheckoutFormProps {
	chefId: string;
	subtotal: number;
	serviceFee: number;
	total: number;
	cartItems: Array<CartItem>;
	address: Array<AddressType>;
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
		selectedAddress: props.address[0]?.id || "",
		paymentMethodId: props.paymentMethods[0]?.id || "",
	});
	const selectedAddress = form.watch("selectedAddress");
	const paymentMethodId = form.watch("paymentMethodId");

	const handleForm = async (input: FormData) => {
		const address = input.get("selectedAddress") as string;
		const paymentMethodId = input.get("paymentMethodId") as string;

		await createCheckoutMutation({
			eventDate: props.eventDate,
			eventTime: props.eventTime,
			address,
			chefId: props.chefId,
			subtotal: props.subtotal,
			serviceFee: props.serviceFee,
			total: props.total,
			paymentMethodId,
			cartItems: props.cartItems,
		});
	};

	return (
		<form action={handleForm} className="space-y-8">
			<Controller
				control={form.control}
				name="selectedAddress"
				render={({ field }) => (
					<div className="space-y-2">
						<div className="flex gap-3 items-center">
							<Label>Event address</Label>
							<AddressModal chefId={props.chefId} />
						</div>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select an address for your event." />
							</SelectTrigger>
							<SelectContent>
								{props.address.map((address, i) => (
									<SelectItem key={address.id} value={address.id}>
										{address.address1}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			/>
			<Controller
				control={form.control}
				name="paymentMethodId"
				render={({ field }) => (
					<div className="space-y-2">
						<Label>Payment method</Label>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
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
					</div>
				)}
			/>

			<div>
				<div className="grid grid-cols-2 mb-2">
					<p className="text-muted-foreground">Subtotal</p>
					<p>{formatNumberToCurrency(Number(props.subtotal))}</p>
				</div>
				{/* TODO: calculate taxes */}
				{/* <div className="grid grid-cols-2 mb-2">
					<p className="text-muted-foreground">Taxes</p>
					<p>{formatNumberToCurrency(10)}</p>
				</div> */}
				<div className="grid grid-cols-2 mb-2 pb-2 border-b-2">
					<p className="text-muted-foreground">Service fee</p>
					<p>{formatNumberToCurrency(getConsumerServiceFee(props.subtotal))}</p>
				</div>
				<div className="grid grid-cols-2">
					<p>Total</p>
					<p>{formatNumberToCurrency(getConsumerCartTotal(props.subtotal))}</p>
				</div>
			</div>

			<small className="block">
				* A hold will be put on your card until the chef confirms your order.
			</small>

			<Button className="mt-4" disabled={!selectedAddress || !paymentMethodId}>
				Checkout
			</Button>
		</form>
	);
}
