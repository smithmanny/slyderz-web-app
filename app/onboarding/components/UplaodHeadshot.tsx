import React, { useState } from "react";
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
  setCloudinaryImage: (arg0: null) => void;
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
    onSuccess: () => props.setCloudinaryImage(null),
    onError: (err) => console.log(err),
  });

  const handleUploadingHeadshot = async () => {
    await completeOnboardingHeadshot.mutateAsync({ image, imagePublicId });
  };

  const handleDestroyingImage = async () => {
    await destroyAccountImage.mutateAsync(imagePublicId);
  };
  return (
    <>
      <div>
        <CldImage
          width="320"
          height="320"
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
  const [cloudinaryImage, setCloudinaryImage] =
    useState<CloudinaryImageType | null>(null);

  return cloudinaryImage ? (
    <UploadHeadshotPreview
      cloudinaryImage={cloudinaryImage}
      setCloudinaryImage={setCloudinaryImage}
    />
  ) : (
    <>
      <Typography>{props.description}</Typography>
      <CldUploadWidget
        uploadPreset="chef_profile_pic"
        onError={(err) => console.log("ERROR uploading headshot", err)}
        onUpload={(res) => {
          console.log(res);
          setCloudinaryImage({
            image: res?.info.secure_url,
            imagePublicId: res?.info.public_id,
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
