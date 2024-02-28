"use client";

import Link from "next/link";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { InputFormField } from "app/components/Form";
import { Button } from "app/components/ui/button";

import loginMutation from "app/actions/mutations/login";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

export default function LoginForm() {
	const formSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		email: "",
		password: "",
	});

	const handleFormSubmit = async (input: FormData) => {
		try {
			await loginMutation(input);
		} catch (err: any) {
			return toast.error(err?.message);
		}
	};

	return (
		<form action={handleFormSubmit} className="space-y-8">
			<Controller
				control={form.control}
				name="email"
				render={({ field }) => (
					<InputFormField
						label="Email"
						placeholder="Enter your email"
						autoComplete="email"
						type="email"
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
						autoComplete="password"
						type="password"
						required
						{...field}
					/>
				)}
			/>
			<div className="text-sm">
				<Link
					href="/forgot-password"
					className="font-semibold text-indigo-600 hover:text-indigo-500"
				>
					Forgot password?
				</Link>
			</div>

			<div className="flex items-center">
				<Button type="submit">Sign in</Button>
				<p className="ml-4 text-center text-sm text-gray-500">
					Not a member?{" "}
					<Link
						href="/signup"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Sign up
					</Link>
				</p>
			</div>
		</form>
	);
}
