"use client";

import { usePlacesWidget } from "react-google-autocomplete";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { InputFormField } from "app/components/Form";
import { Button } from "app/components/ui/button";

import { updateAccountAddressMutation } from "app/actions/mutations/updateAddress";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import type { address } from "drizzle/schema/user";

export function mapGoogleToAddress(addressComponents: any) {
	const addressMap = new Map();

	for (const component of addressComponents) {
		const componentType = component.types[0];

		switch (componentType) {
			case "street_number":
				addressMap.set("address1", component.long_name);
				break;
			case "route": // street name
				if (addressMap.has("address1")) {
					const streetNumber = addressMap.get("address1");
					addressMap.set("address1", `${streetNumber} ${component.long_name}`);
				}
				break;
			case "locality":
				addressMap.set("city", component.long_name);
				break;
			case "administrative_area_level_1": // state
				addressMap.set("state", component.short_name);
				break;
			case "postal_code":
				addressMap.set("zipcode", component.long_name);
				break;
		}
	}

	return addressMap;
}

async function handleAccountForm(input: FormData) {
	const { message, error } = await updateAccountAddressMutation(input);

	if (error) {
		return toast.error(message);
	}

	return toast.success(message);
}

type AccountAddressFormProps = {
	address: typeof address.$inferSelect | undefined;
};
export default function AccountAddressForm(props: AccountAddressFormProps) {
	const formSchema = z.object({
		address1: z.string(),
		address2: z.string().optional(),
		city: z.string(),
		state: z.string(),
		zipcode: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		address1: props.address?.address1 || "",
		address2: props.address?.address2 ? props.address?.address2 : "",
		city: props.address?.city || "",
		state: props.address?.state || "",
		zipcode: props.address?.zipcode || "",
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
	return (
		<form action={handleAccountForm} className="space-y-8">
			<Controller
				control={form.control}
				name="address1"
				render={({ field }) => (
					<InputFormField
						label="Street Number"
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

			<Button type="submit" className="mt-4">
				Save
			</Button>
		</form>
	);
}
