"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

import { Button } from "app/components/ui/button";

import deletePaymentMethodMutation from "app/actions/mutations/deletePaymentMethod";

import type Stripe from "stripe";

const AddPaymentForm = dynamic(
	() => import("app/(consumer)/account/AddPaymentForm"),
);

interface CreditCardFormProps {
	clientSecret: string;
	paymentMethods: Array<Stripe.PaymentMethod>;
}
export default function CreditCardForm(props: CreditCardFormProps) {
	const [showAddPaymentForm, setAddPaymentForm] = useState<boolean>(false);
	const openAddPaymentForm = useCallback(() => setAddPaymentForm(true), []);
	const closeAddPaymentForm = useCallback(() => setAddPaymentForm(false), []);

	return (
		<section>
			{showAddPaymentForm || props.paymentMethods.length === 0 ? (
				<AddPaymentForm
					clientSecret={props.clientSecret}
					closeAddPaymentForm={closeAddPaymentForm}
				/>
			) : (
				<div>
					{props.paymentMethods.map((payment, i) => (
						<div
							key={`${payment.id}-${i}`}
							className="grid grid-cols-2 border-b-2 pb-2 items-center"
						>
							<div>{payment.card?.last4}</div>
							<div className="text-right">
								<Button
									variant="destructive"
									onClick={async () =>
										await deletePaymentMethodMutation(payment.id)
									}
								>
									Delete
								</Button>
							</div>
						</div>
					))}

					<Button
						variant="ghost"
						size="sm"
						className="mt-2 pl-0"
						onClick={openAddPaymentForm}
					>
						<PlusIcon className="mr-2 h-4 w-4" /> Add new card
					</Button>
				</div>
			)}
		</section>
	);
}
