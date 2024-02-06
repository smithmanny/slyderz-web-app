"use client";

import { toast } from "sonner";
import { z } from "zod";

import { Button } from "app/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "app/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";

import createMenuSectionMutation from "app/actions/mutations/createMenuSection";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

export default function AddMenuSectionButton() {
	const formSchema = z.object({
		name: z.string(),
	});
	const form = useSlyderzForm(formSchema, {
		name: "",
	});

	const handleCreateSection = async (input: FormData) => {
		const sectionName = input.get("name") as string;

		if (sectionName) {
			try {
				return await createMenuSectionMutation({ name: sectionName });
			} catch (err: any) {
				return toast.error(err.message);
			}
		}

		toast.error("Section name can't be empty");
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add Section</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add section</DialogTitle>
					<DialogDescription>
						Create a section for your menu here.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form action={handleCreateSection} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Section</FormLabel>
									<FormControl>
										<Input placeholder="Enter your section name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="submit">Create section</Button>
							</DialogClose>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
