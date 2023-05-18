import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useMutation } from "@blitzjs/rpc";

import completeOnboardingHeadshotMutation from "../mutations/completeOnboardingHeadshotMutation";
import destroyCloudinaryImageMutation from "app/cloudinary/mutations/destroyCloudinaryImageMutation";

import Button from "app/core/components/shared/Button";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";

type CloudinaryImageType = {
  url: string;
  publicId: string;
};
interface UploadHeadshotPreviewType {
  cloudinaryImage: CloudinaryImageType;
  setCloudinaryImage: (arg0: null) => void;
}

function UploadHeadshotPreview(props: UploadHeadshotPreviewType) {
  const { url, publicId } = props.cloudinaryImage;
  const [uploadHeadshot] = useMutation(completeOnboardingHeadshotMutation);
  const [destroyCloudinaryImage] = useMutation(destroyCloudinaryImageMutation, {
    onSuccess: () => props.setCloudinaryImage(null),
    onError: (err) => console.log(err),
  });

  const handleUploadingHeadshot = async () => {
    await uploadHeadshot({ url });
  };

  const handleDestroyingImage = async () => {
    await destroyCloudinaryImage({ publicId });
  };
  return (
    <>
      <div>
        <CldImage
          width="320"
          height="320"
          src={url}
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

function UploadHeadshot() {
  const [cloudinaryImage, setCloudinaryImage] =
    useState<CloudinaryImageType | null>(null);

  return cloudinaryImage ? (
    <UploadHeadshotPreview
      cloudinaryImage={cloudinaryImage}
      setCloudinaryImage={setCloudinaryImage}
    />
  ) : (
    <>
      <Typography>Please upload a headshot with a solid background.</Typography>
      <CldUploadWidget
        uploadPreset="chef_profile_pic"
        onError={(err) => console.log("ERROR uploading headshot", err)}
        onUpload={(res) => {
          console.log(res);
          setCloudinaryImage({
            url: res?.info.secure_url,
            publicId: res?.info.public_id,
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
