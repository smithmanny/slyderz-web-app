import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import Image from "next/image";

import { trpc } from "server/utils/trpc";

import Button from "app/core/components/shared/Button";
import IconButton from "app/core/components/shared/IconButton";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";

type CloudinaryImageType = {
  image: string;
  imagePublicId: string;
};
interface UploadHeadshotPreviewType {
  cloudinaryImage: CloudinaryImageType;
  invalidateCache: () => Promise<void>;
}

function UploadHeadshotPreview(props: UploadHeadshotPreviewType) {
  const { image, imagePublicId } = props.cloudinaryImage;

  const destroyAccountImage = trpc.account.deleteAccountPicture.useMutation({
    onSuccess: async () => {
      await props.invalidateCache();
    },
    onError: (err) => console.log(err),
  });

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
          priority
        />
      </div>
      <Stack direction="row">
        <Button
          label="continue onboarding"
          variant="outlined"
          onClick={handleDestroyingImage}
          sx={{ mt: 1, mr: 1 }}
        >
          Delete
        </Button>
      </Stack>
    </>
  );
}

interface UploadHeadshotType {
  image?: string;
}
function UploadImage(props: UploadHeadshotType) {
  const utils = trpc.useContext();

  const invalidatePictureQuery = async () => {
    return await utils.account.fetchAccountPicture.invalidate();
  };

  const fetchProfileImage = trpc.account.fetchAccountPicture.useQuery();
  const setAccountPicture = trpc.account.setAccountPicture.useMutation({
    onSuccess: invalidatePictureQuery,
  });

  return fetchProfileImage.data ? (
    <UploadHeadshotPreview
      cloudinaryImage={fetchProfileImage.data}
      invalidateCache={invalidatePictureQuery}
    />
  ) : (
    <>
      <CldUploadWidget
        uploadPreset="chef_profile_pic"
        onError={(err) => console.log("ERROR uploading profile picture", err)}
        onUpload={async (res) => {
          setAccountPicture.mutateAsync({
            image: res.info.secure_url,
            publicId: res.info.public_id,
          });
        }}
        options={{
          cropping: true,
          croppingCoordinatesMode: "face",
          minImageHeight: 200,
          minImageWidth: 200,
          sources: ["local"],
          resourceType: "image",
        }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <IconButton onClick={handleOnClick}>
              <Image
                alt="Upload profile image"
                src="/add-pic.svg"
                width={150}
                height={150}
              />
            </IconButton>
          );
        }}
      </CldUploadWidget>
    </>
  );
}

export default UploadImage;
