import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Input } from "app/components/ui/input";
import { OnboardingNextButton } from "./OnboardingDashboard";

import handleOnboardingStepMutation from "app/actions/mutations/handleHeadshotOnboardingNextStep";

export default function HeadshotOnboardingStep() {
	const [imageUrl, setImageUrl] = useState<string>("");

	useEffect(() => {
		fetch("/api/onboarding/headshot", {
			method: "GET",
		})
			.then((res) => res.json())
			.then(({ imageUrl }) => {
				if (imageUrl) {
					setImageUrl(imageUrl);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] as unknown as File;
		const formData = new FormData();
		formData.set("file", file);

		try {
			const res = await fetch("/api/onboarding/headshot", {
				method: "PUT",
				body: formData,
			});
			const data = await res.json();

			if (data.imageUrl) {
				setImageUrl(data.imageUrl);
			}
		} catch (err) {
			console.log("Failed to upload", err);
		}
	};
	return (
		<>
			<div className="pt-8 flex items-center gap-4">
				<Avatar className="w-20 h-20">
					<AvatarImage src={imageUrl} />
					<AvatarFallback>SLY</AvatarFallback>
				</Avatar>

				<Input
					onChange={handleFileChange}
					id="headshot"
					type="file"
					accept="image/png, image/jpeg"
				/>
			</div>

			<OnboardingNextButton
				disabled={imageUrl === ""}
				mutation={handleOnboardingStepMutation}
			/>
		</>
	);
}
