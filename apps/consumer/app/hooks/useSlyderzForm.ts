"import client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

interface DefaultValuesType {
	[index: string]:
		| string
		| number
		| Array<string | number | { [key: string]: any }>
		| boolean;
}
export function useSlyderzForm(
	formSchema: z.ZodSchema,
	defaultValues: DefaultValuesType,
) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	return form;
}
