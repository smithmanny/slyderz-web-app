"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Input } from "app/components/ui/input";
import { Button } from "./ui/button";

import uploadProfilePhotoMutation from "app/actions/mutations/uploadProfilePhoto";
import { useSlyderzForm } from "app/hooks/useSlyderzForm";

interface UploadImageProps {
	profilePhoto: string | null;
}
export function UploadImage(props: UploadImageProps) {
	const formSchema = z.object({
		file: z.any(),
	});
	const form = useSlyderzForm(formSchema, {});
	const [imageFileUrl, setImageFileUrl] = useState<File>();

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] as unknown as File;

		setImageFileUrl(file);
	};

	const handleForm = async (input: FormData) => {
		try {
			await uploadProfilePhotoMutation(input);
		} catch (err) {
			return toast.error("Profile photo not uploaded");
		}

		return toast.success("Profile photo successfully saved");
	};
	return (
		<form action={handleForm}>
			<div className="py-8 flex items-center gap-4">
				<Avatar className="w-20 h-20">
					{imageFileUrl ? (
						<AvatarImage src={URL.createObjectURL(imageFileUrl)} />
					) : props.profilePhoto ? (
						<AvatarImage src={props.profilePhoto} />
					) : (
						<AvatarFallback>SLY</AvatarFallback>
					)}
				</Avatar>

				<Controller
					control={form.control}
					name="file"
					render={({ field }) => (
						<Input
							{...field}
							onChange={handleFileChange}
							id="headshot"
							type="file"
							accept="image/png, image/jpeg"
						/>
					)}
				/>
			</div>

			<Button>Save Image</Button>
		</form>
	);
}
