"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "app/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";

import loginMutation from "app/actions/mutations/login";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

export default function LoginForm() {
	const [state, dispatch] = useFormState(loginMutation, undefined);
	const formSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		email: "",
		password: "",
	});
	const email = form.getFieldState("email");
	const password = form.getFieldState("password");

	useEffect(() => {
		if (state?.error) {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<Form {...form}>
			<form action={dispatch} className="space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your password"
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
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
					<Button type="submit" disabled={!email.isDirty || !password.isDirty}>
						Sign in
					</Button>
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
		</Form>
	);
}
