import React from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

import { trpc } from "server/utils/trpc";

import Button from "app/core/components/shared/Button";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";

type CloudinaryImageType = {
  image: string;
  imagePublicId: string;
};
interface UploadHeadshotPreviewType {
  cloudinaryImage: CloudinaryImageType;
}

function UploadHeadshotPreview(props: UploadHeadshotPreviewType) {
  const { image, imagePublicId } = props.cloudinaryImage;
  const utils = trpc.useContext();

  const completeOnboardingHeadshot =
    trpc.onboarding.completeOnboardingHeadshot.useMutation({
      onSuccess: async () => {
        await utils.chef.invalidate();
      },
    });
  const destroyAccountImage = trpc.account.deleteAccountPicture.useMutation({
    onSuccess: async () => {
      await utils.account.fetchAccountPicture.invalidate();
    },
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
          src={image}
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

  const invalidatePictureQuery = async () => {
    await utils.account.fetchAccountPicture.invalidate();
  };

  const fetchProfileImage = trpc.account.fetchAccountPicture.useQuery();
  const setAccountPicture = trpc.account.setAccountPicture.useMutation({
    onSuccess: invalidatePictureQuery,
  });

  return fetchProfileImage.data ? (
    <UploadHeadshotPreview cloudinaryImage={fetchProfileImage.data} />
  ) : (
    <>
      <Typography>{props.description}</Typography>
      <CldUploadWidget
        uploadPreset="chef_profile_pic"
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
