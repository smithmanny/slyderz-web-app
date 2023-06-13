import React, { useCallback } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

import { trpc } from "server/utils/trpc";

import Button from "app/core/components/shared/Button";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";

type CloudinaryImageType = {
  imageUrl: string;
  imagePublicId: string;
};
interface UploadHeadshotPreviewType {
  cloudinaryImage: CloudinaryImageType;
  invalidateOnboardingState: () => Promise<void>;
}

function UploadHeadshotPreview(props: UploadHeadshotPreviewType) {
  const { imageUrl, imagePublicId } = props.cloudinaryImage;

  const completeOnboardingHeadshot =
    trpc.onboarding.completeOnboardingHeadshot.useMutation({
      onSuccess: props.invalidateOnboardingState,
    });
  const destroyAccountImage = trpc.account.deleteAccountPicture.useMutation({
    onSuccess: props.invalidateOnboardingState,
    onError: (err) => console.log(err),
  });

  const handleUploadingHeadshot = async () => {
    await completeOnboardingHeadshot.mutateAsync();
  };

  const handleDestroyingImage = async () => {
    await destroyAccountImage.mutateAsync({ publicId: imagePublicId });
  };
  return (
    <>
      <div>
        <CldImage
          width="150"
          height="150"
          src={imageUrl}
          sizes="100vw"
          alt="chef headshot"
        />
      </div>
      <Stack direction="row">
        <Button
          label="continue onboarding"
          variant="outlined"
          onClick={handleDestroyingImage}
          sx={{ mt: 1, mr: 1 }}
        >
          Replace
        </Button>
        <Button
          label="continue onboarding"
          variant="contained"
          onClick={handleUploadingHeadshot}
          sx={{ mt: 1, mr: 1 }}
        >
          Continue
        </Button>
      </Stack>
    </>
  );
}

interface UploadHeadshotType {
  description?: string;
}
function UploadHeadshot(props: UploadHeadshotType) {
  const utils = trpc.useContext();

  const invalidateOnboardingState = useCallback(async () => {
    await utils.onboarding.fetchOnboardingState.invalidate();
  }, [utils.onboarding.fetchOnboardingState]);

  const fetchProfileImage = trpc.account.fetchAccountPicture.useQuery();
  const setAccountPicture = trpc.account.setAccountPicture.useMutation({
    onSuccess: invalidateOnboardingState,
  });

  return fetchProfileImage.data?.imagePublicId ? (
    <UploadHeadshotPreview
      cloudinaryImage={fetchProfileImage.data}
      invalidateOnboardingState={invalidateOnboardingState}
    />
  ) : (
    <>
      <Typography>{props.description}</Typography>
      <CldUploadWidget
        uploadPreset="user_profile_pic"
        onError={(err) => console.log("ERROR uploading headshot", err)}
        onUpload={(res) => {
          setAccountPicture.mutateAsync({
            image: res.info.secure_url,
            publicId: res.info.public_id,
          });
        }}
        options={{
          cropping: true,
          croppingCoordinatesMode: "face",
          minImageHeight: 250,
          minImageWidth: 250,
          sources: ["local"],
          resourceType: "image",
        }}
      >
        {({ open, isLoading }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <Button
              label="Upload headshot"
              variant="contained"
              onClick={handleOnClick}
              sx={{ mt: 1, mr: 1 }}
              disabled={isLoading}
            >
              Upload Headshot
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
}

export default UploadHeadshot;
