import * as React from "react";

import { Input } from "app/components/ui/input";
import { cn } from "app/lib/utils";
import { Label } from "./ui/label";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
interface InputFormFieldProps extends InputProps {
	label: string;
	error?: string;
}
export const InputFormField = React.forwardRef<
	HTMLInputElement,
	InputFormFieldProps
>(({ className, placeholder, name, label, ...props }, ref) => {
	const formDescriptionId = React.useId();
	return (
		<div className="space-y-2">
			<Label htmlFor={name}>{label}</Label>
			<Input
				id={name}
				placeholder={placeholder}
				ref={ref}
				name={name}
				{...props}
			/>
		</div>
	);
});
