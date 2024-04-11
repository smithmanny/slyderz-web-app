"use client";

import { usePlacesWidget } from "react-google-autocomplete";
import { Controller } from "react-hook-form";
import * as z from "zod";

import { InputFormField } from "app/components/Form";
import { Button } from "app/components/ui/button";

import { useSlyderzForm } from "app/hooks/useSlyderzForm";

function mapGoogleToAddress(addressComponents: any) {
	const address = {
		address1: "",
		address2: "",
		city: "",
		state: "",
		zipcode: "",
	};

	for (const component of addressComponents) {
		const componentType = component.types[0];

		switch (componentType) {
			case "street_number":
				address.address1 = componentType.long_name;
				break;
			case "route": // street name
				address.address1 = `${address.address1} ${componentType.long_name}`;
				break;
			case "locality":
				address.city = componentType.long_name;
				break;
			case "administrative_area_level_1": // state
				address.state = componentType.short_name;
				break;
			case "postal_code":
				address.zipcode = componentType.long_name;
				break;
		}
	}
}

interface ProfileInfoFormProps {
	email: string;
	name: string;
}
export default function ProfileInfoForm(props: ProfileInfoFormProps) {
	const formSchema = z.object({
		name: z.string(),
		email: z.string().email(),
		address: z.string().optional(),
	});
	const form = useSlyderzForm(formSchema, {
		name: props.name,
		email: props.email,
		address: "",
	});
	const { ref } = usePlacesWidget({
		apiKey: process.env.GOOGLE_MAPS_KEY,
		onPlaceSelected: (place) => {
			mapGoogleToAddress(place.address_components);
		},
		options: {
			types: ["address"],
			componentRestrictions: { country: "us" },
			fields: ["address_components", "geometry"],
		},
	});
	const inputRef = ref as unknown as React.Ref<HTMLInputElement> | null;
	return (
		<form action="/" className="space-y-8">
			<Controller
				control={form.control}
				name="email"
				disabled
				render={({ field }) => (
					<InputFormField
						label="Email"
						placeholder="Enter your email"
						{...field}
					/>
				)}
			/>
			<Controller
				control={form.control}
				name="name"
				disabled
				render={({ field }) => (
					<InputFormField
						label="First Name"
						placeholder="Enter your first name"
						{...field}
					/>
				)}
			/>
			<Controller
				control={form.control}
				name="address"
				render={({ field }) => (
					<InputFormField
						label="Address"
						placeholder="Enter your address"
						{...field}
						ref={inputRef}
					/>
				)}
			/>

			<Button className="mt-4">Save</Button>
		</form>
	);
}
