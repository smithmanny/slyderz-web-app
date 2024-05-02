"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { InputFormField } from "app/components/Form";
import { Button } from "app/components/ui/button";

import signupMutation from "app/actions/mutations/signup";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

export default function SignupForm() {
	const handleForm = async (input: FormData) => {
		try {
			await signupMutation(input);
		} catch (err: any) {
			toast.error(err.message);
		}
	};
	const formSchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		name: "",
		email: "",
		password: "",
	});

	return (
		<form id="signup-form" action={handleForm} className="space-y-8 mt-8">
			<Controller
				control={form.control}
				name="name"
				render={({ field }) => (
					<InputFormField
						label="First Name"
						placeholder="Enter your name"
						autoComplete="name"
						required
						{...field}
					/>
				)}
			/>
			<Controller
				control={form.control}
				name="email"
				render={({ field }) => (
					<InputFormField
						label="Email"
						placeholder="Enter your email"
						autoComplete="email"
						required
						{...field}
					/>
				)}
			/>
			<Controller
				control={form.control}
				name="password"
				render={({ field }) => (
					<InputFormField
						label="Password"
						placeholder="Enter your password"
						type="password"
						autoComplete="password"
						required
						{...field}
					/>
				)}
			/>

			<div className="flex items-center">
				<Button type="submit">Sign up</Button>
				<p className="ml-4 text-center text-sm text-gray-500">
					Already have an account?{" "}
					<Link
						href="/login"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Sign in
					</Link>
				</p>
			</div>
		</form>
	);
}
