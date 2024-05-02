import { useMutation, useQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Input } from "app/components/ui/input";
import { OnboardingNextButton } from "./OnboardingDashboard";

import handleOnboardingStepMutation from "app/actions/mutations/handleHeadshotOnboardingNextStep";
import uploadProfilePhotoMutation from "app/actions/mutations/uploadProfilePhoto";
import getProfileImage from "app/actions/queries/getProfileImage";

export default function HeadshotOnboardingStep() {
	const { data, refetch } = useQuery({
		queryKey: ["user-headshot"],
		queryFn: () => getProfileImage(),
	});
	const mutation = useMutation({
		mutationFn: (input: FormData) => uploadProfilePhotoMutation(input),
	});

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0] as unknown as File;
		const formData = new FormData();
		formData.set("file", file);

		await mutation.mutateAsync(formData);

		refetch();
	};
	return (
		<>
			<div className="pt-8 flex items-center gap-4">
				<Avatar className="w-20 h-20">
					<AvatarImage src={data?.headshotUrl || ""} />
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
				disabled={!data?.headshotUrl}
				mutation={handleOnboardingStepMutation}
			/>
		</>
	);
}
