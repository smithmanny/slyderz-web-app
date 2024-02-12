"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "app/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
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
import { deleteMenuSectionMutation } from "app/actions/mutations/deleteMenuSection";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

type SectionType = {
	id: string;
	name: string;
};
interface AddMenuSectionButtonProps {
	sections: Array<SectionType>;
}
export default function AddMenuSectionButton(props: AddMenuSectionButtonProps) {
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
				await createMenuSectionMutation({ name: sectionName });
			} catch (err: any) {
				return toast.error(err.message);
			}

			form.reset();
			return toast.success("Section successfully created");
		}

		toast.error("Section name can't be empty");
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Sections</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] overflow-auto">
				<DialogHeader>
					<DialogTitle>Edit section</DialogTitle>
					<DialogDescription>
						Create and edit your sections for your menu here.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form action={handleCreateSection} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Add Section</FormLabel>
									<FormControl>
										<Input placeholder="Enter your section name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit">Create section</Button>

						<div className="h-[2px] w-full bg-slate-300" />

						<ul>
							<FormLabel>Edit Section</FormLabel>
							{props.sections.map((section) => (
								<li key={section.id} className="flex">
									<h6 className="flex-1 capitalize">{section.name}</h6>
									<Button
										variant="ghost"
										size="icon"
										onClick={async (e) => {
											e.preventDefault();
											e.stopPropagation();

											const { message, error } =
												await deleteMenuSectionMutation({
													sectionId: section.id,
												});

											if (error) {
												return toast.error(message);
											}

											toast.success(message);
										}}
									>
										<TrashIcon className="text-red-600 h-4 w-4" />
									</Button>
								</li>
							))}
						</ul>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
