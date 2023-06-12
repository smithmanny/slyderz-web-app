import React, { ReactElement } from "react";
import {
  CldUploadWidget,
  CldImage,
  CldUploadWidgetProps,
} from "next-cloudinary";
import Image from "next/image";
import { useSnackbar } from "notistack";

import { trpc } from "server/utils/trpc";

import Button from "app/core/components/shared/Button";
import IconButton from "app/core/components/shared/IconButton";
import Stack from "app/core/components/shared/Stack";

type CloudinaryImageType = {
  image: string;
  imagePublicId: string;
};
interface UploadedImagePreviewType {
  cloudinaryImage: CloudinaryImageType;
  invalidateCacheOnDestroy: () => Promise<void>;
  snackbar: (err: string, object: object) => void;
}

function UploadedImagePreview(props: UploadedImagePreviewType) {
  const { image, imagePublicId } = props.cloudinaryImage;

  const destroyAccountImage = trpc.account.deleteAccountPicture.useMutation({
    onSuccess: props.invalidateCacheOnDestroy,
    onError: (err) => {
      console.log(err);
      props.snackbar("Image not deleted. Please try again", {
        variant: "error",
      });
    },
  });

  const handleDestroyingImage = async () => {
    await destroyAccountImage.mutateAsync({ publicId: imagePublicId });
  };

  return (
    <>
      <CldImage
        width="150"
        height="150"
        src={image}
        sizes="100vw"
        alt="chef headshot"
        priority
      />
      <Stack direction="row">
        <Button
          label="delete profile picture"
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

interface UploadImageProps extends CldUploadWidgetProps {
  image: CloudinaryImageType | null | undefined;
  invalidateCacheOnDestroy: () => Promise<void>;
  onUpload: (res) => Promise<void>;
  previewComponent?: ReactElement;
}

function UploadImage(props: UploadImageProps) {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: Show spinner for loading state
  return props.image ? (
    props.previewComponent ? (
      props.previewComponent
    ) : (
      <UploadedImagePreview
        cloudinaryImage={props.image}
        invalidateCacheOnDestroy={props.invalidateCacheOnDestroy}
        snackbar={enqueueSnackbar}
      />
    )
  ) : (
    <>
      <CldUploadWidget
        uploadPreset="chef_profile_pic"
        onError={(err) => {
          console.log(err);
          enqueueSnackbar("Image not uploaded", {
            variant: "error",
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
        {...props}
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
