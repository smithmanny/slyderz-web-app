"use client";

import * as z from "zod";

import { Button } from "app/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";

import { useSlyderzForm } from "app/hooks/useSlyderzForm";

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
	return (
		<Form {...form}>
			<form action="/" className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					disabled
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
							</FormControl>
							{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					disabled
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your first name" {...field} />
							</FormControl>
							{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel>House Address</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your house address"
									autoComplete="street-address"
									{...field}
								/>
							</FormControl>
							{/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="mt-4"
					// disabled={!values.selectedAddress || !values.paymentMethod}
					// onClick={async (e) => {
					//   e.preventDefault();
					//   e.stopPropagation();

					//   await createCheckoutMutation({
					//     eventDate: props.eventDate,
					//     eventTime: props.eventTime,
					//     address: values.selectedAddress,
					//     chefId: props.chefId,
					//     cartTotal: props.cartTotal,
					//     paymentMethodId: values.paymentMethod,
					//     cartItems: props.cartItems,
					//   });
					// }}
				>
					Save
				</Button>
			</form>
		</Form>
	);
}
