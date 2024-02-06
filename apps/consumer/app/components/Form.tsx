import { cn } from "app/lib/utils";
import React, { ReactNode } from "react";

interface FormProps extends React.ComponentProps<"form"> {
	action: string;
	method: string;
}
export function Form(props: FormProps) {
	return (
		<form
			className={cn("space-y-6", props.className)}
			action={props.action}
			method={props.method}
		>
			{props.children}
		</form>
	);
}

interface FormFieldProps {
	children: ReactNode;
	name: string;
	type?: string;
	className?: string;
	label?: string;
}
export function FormField(props: FormFieldProps) {
	const { name, label, ...rest } = props;
	return (
		<div>
			{label && (
				<label
					htmlFor={name}
					className="block text-sm font-medium leading-6 text-gray-900"
				>
					{label}
				</label>
			)}
			<div className="mt-2">
				<input
					id={name}
					name={name}
					type={name}
					className={cn(
						"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
						props.className,
					)}
					{...rest}
				/>
			</div>
		</div>
	);
}

export function SubmitButton() {
	return (
		<button
			type="submit"
			className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
			Sign in
		</button>
	);
}
