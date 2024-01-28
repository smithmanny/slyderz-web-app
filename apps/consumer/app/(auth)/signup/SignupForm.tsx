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

import signupMutation from "app/actions/mutations/signup";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

export default function SignupForm() {
	const formSchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		email: "",
		password: "",
	});
	const name = form.getFieldState("name");
	const email = form.getFieldState("email");
	const password = form.getFieldState("password");

	return (
		<Form {...form}>
			<form action={signupMutation} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter your email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
								<Input placeholder="Enter your password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-center">
					<Button
						type="submit"
						disabled={!email.isDirty || !password.isDirty || !name.isDirty}
					>
						Sign up
					</Button>
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
		</Form>
	);
}
