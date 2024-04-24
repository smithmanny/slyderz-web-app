"use client";

import { usePlacesWidget } from "react-google-autocomplete";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { mapGoogleToAddress } from "app/(consumer)/account/AddressForm";
import { updateCheckoutAddressMutation } from "app/actions/mutations/updateAddress";
import { InputFormField } from "app/components/Form";
import { Button } from "app/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "app/components/ui/dialog";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

export default function AddressModal(props: { chefId: string }) {
	const formSchema = z.object({
		address1: z.string(),
		address2: z.string().optional(),
		city: z.string(),
		state: z.string(),
		zipcode: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipcode: "",
	});

	const { ref } = usePlacesWidget({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
		onPlaceSelected: (place) => {
			const userAddress = mapGoogleToAddress(place.address_components);

			for (const addy of userAddress.entries()) {
				form.setValue(addy[0], addy[1]);
			}
		},
		options: {
			types: ["address"],
			componentRestrictions: { country: "us" },
			fields: ["address_components", "geometry"],
		},
	});
	const inputRef = ref as unknown as React.Ref<HTMLInputElement> | null;

	async function handleAccountForm(input: FormData) {
		const { message, error } = await updateCheckoutAddressMutation(
			input,
			props.chefId,
		);

		if (error) {
			return toast.error(message);
		}

		return toast.success(message);
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add address</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] overflow-auto">
				<DialogHeader>
					<DialogTitle>Add Address</DialogTitle>
				</DialogHeader>
				<form action={handleAccountForm} className="space-y-8">
					<Controller
						control={form.control}
						name="address1"
						render={({ field }) => (
							<InputFormField
								label="Street Name"
								placeholder="Enter your address"
								autoComplete="off"
								role="presentation"
								{...field}
								ref={inputRef}
							/>
						)}
					/>
					<Controller
						control={form.control}
						name="address2"
						render={({ field }) => (
							<InputFormField
								label="Apartment #"
								placeholder="Enter your apartment #"
								{...field}
							/>
						)}
					/>
					<Controller
						control={form.control}
						name="city"
						render={({ field }) => (
							<InputFormField
								label="City"
								placeholder="Enter your city"
								{...field}
							/>
						)}
					/>

					<div className="flex justify-between">
						<Controller
							control={form.control}
							name="state"
							render={({ field }) => (
								<InputFormField
									label="State"
									placeholder="Select your state"
									{...field}
								/>
							)}
						/>
						<Controller
							control={form.control}
							name="zipcode"
							render={({ field }) => (
								<InputFormField
									label="Zipcode"
									placeholder="Enter your zipcode"
									type="number"
									{...field}
								/>
							)}
						/>
					</div>

					<DialogClose asChild>
						<Button type="submit" className="mt-4">
							Save address
						</Button>
					</DialogClose>
				</form>
			</DialogContent>
		</Dialog>
	);
}
