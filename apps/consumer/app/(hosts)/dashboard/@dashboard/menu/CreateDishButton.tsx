"use client";

import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { useCallback, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Label } from "app/components//ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Button } from "app/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "app/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "app/components/ui/dialog";
import { Input } from "app/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "app/components/ui/popover";
import { Textarea } from "app/components/ui/textarea";
import { cn } from "app/lib/utils";

import { createDishMutation } from "app/actions/mutations/createDish";
import createMenuSectionMutation from "app/actions/mutations/createMenuSection";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

interface DishModalProps {
	sections: Array<{ label: string; value: string }>;
	closeModal: () => void;
}
function DishModal(props: DishModalProps) {
	const [open, setOpen] = useState<boolean>(false);
	const [image, setImage] = useState<File>();
	const [newSectionName, setNewSectionName] = useState<string>("");

	const createDishSchema = z.object({
		image: z.any(),
		name: z.string(),
		description: z.string().max(250),
		price: z.number().min(0),
		sectionId: z.string(),
	});
	const dishForm = useSlyderzForm(createDishSchema, {
		image: "",
		name: "",
		description: "",
		price: "",
		sectionId: "",
	});

	const handleCreateSection = async () => {
		if (newSectionName) {
			try {
				return await createMenuSectionMutation({ name: newSectionName });
			} catch (err: any) {
				return toast.error(err.message);
			}
		}

		toast.error("Section name can't be empty");
	};

	const handleFormSubmit = async (input: FormData) => {
		try {
			await createDishMutation(input);
		} catch (err) {
			console.log(err);
			return;
		}

		props.closeModal();
	};
	return (
		<DialogContent className="sm:max-w-lg h-3/4">
			<DialogHeader>
				<DialogTitle>Create Dish</DialogTitle>
				<DialogDescription>
					Create new dish and assign to a section.
				</DialogDescription>
			</DialogHeader>
			<form
				id="create-dish-form"
				action={handleFormSubmit}
				className="space-y-8 overflow-auto"
			>
				<Controller
					control={dishForm.control}
					name="image"
					render={({ field }) => (
						<div className="pt-8 flex items-center gap-4">
							<Avatar className="w-20 h-20">
								{image ? (
									<AvatarImage src={URL.createObjectURL(image)} />
								) : (
									<AvatarFallback>SLY</AvatarFallback>
								)}
							</Avatar>

							<Input
								{...field}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const imageFile = e.target.files?.[0];
									field.onChange(e);
									setImage(imageFile);
								}}
								id="headshot"
								type="file"
								accept="image/png, image/jpeg"
							/>
						</div>
					)}
				/>
				<Controller
					control={dishForm.control}
					name="name"
					render={({ field }) => (
						<div className="space-y-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								placeholder="Enter your dish name"
								required
								{...field}
							/>
						</div>
					)}
				/>
				<Controller
					control={dishForm.control}
					name="description"
					render={({ field }) => (
						<div className="space-y-2">
							<Label>Description</Label>
							<Textarea rows={3} {...field} required />
						</div>
					)}
				/>
				<Controller
					control={dishForm.control}
					name="price"
					render={({ field }) => (
						<div className="space-y-2">
							<Label>Price</Label>
							<Input
								placeholder="Enter your dish price"
								type="number"
								required
								min={0}
								{...field}
							/>
						</div>
					)}
				/>
				<Controller
					control={dishForm.control}
					name="sectionId"
					render={({ field }) => (
						<div className="space-y-2 flex flex-col">
							<Label>Assign dish to section</Label>
							<input hidden name="sectionId" value={field.value} />
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										className={cn(
											"justify-between",
											!field.value && "text-muted-foreground",
										)}
									>
										{field.value
											? props.sections.find(
													(section) => section.value === field.value,
											  )?.label
											: "Select section"}
										<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="p-0">
									<Command>
										<CommandInput
											placeholder="Search sections..."
											className="h-9"
											onKeyUp={(e: any) => setNewSectionName(e.target.value)}
											required
										/>
										<CommandEmpty>
											<Button
												variant="ghost"
												className="w-full flex justify-start"
												onClick={handleCreateSection}
											>
												<PlusIcon className={cn("h-5 w-5 font-bold pr-2")} />
												<strong>Create new section: {newSectionName}</strong>
											</Button>
										</CommandEmpty>
										<CommandGroup>
											{props.sections.map((section) => (
												<CommandItem
													value={section.label}
													key={section.value}
													onSelect={(e) => {
														dishForm.setValue("sectionId", section.value);
														setOpen(false);
													}}
													className="capitalize"
												>
													{section.label}
													<CheckIcon
														className={cn(
															"ml-auto h-4 w-4",
															section.value === field.value
																? "opacity-100"
																: "opacity-0",
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					)}
				/>
				<DialogFooter className="mt-4">
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}

const generateMenuSectionsFormValues = (sections: Array<MenuSection>) => {
	return sections.map((section) => ({
		label: section.name,
		value: section.id,
	}));
};

type MenuSection = {
	id: string;
	name: string;
};
interface CreateDishButtonProps {
	sections: Array<MenuSection>;
}
export default function CreateDishButton(props: CreateDishButtonProps) {
	const [openModal, setModalOpen] = useState<boolean>(false);
	const sections = generateMenuSectionsFormValues(props.sections);

	const closeModal = useCallback(() => setModalOpen(false), []);
	return (
		<Dialog open={openModal} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button>Create Dish</Button>
			</DialogTrigger>

			<DishModal sections={sections} closeModal={closeModal} />
		</Dialog>
	);
}
