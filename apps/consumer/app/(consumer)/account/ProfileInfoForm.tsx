"use client";

import { Controller } from "react-hook-form";
import * as z from "zod";

import { InputFormField } from "app/components/Form";

import { useSlyderzForm } from "app/hooks/useSlyderzForm";

interface ProfileInfoFormProps {
	email: string;
	name: string;
}
export default function ProfileInfoForm(props: ProfileInfoFormProps) {
	const formSchema = z.object({
		name: z.string(),
		email: z.string().email(),
	});
	const form = useSlyderzForm(formSchema, {
		name: props.name,
		email: props.email,
	});

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
		</form>
	);
}
