import React from "react";
import {
  CldUploadWidget,
  CldImage,
  CldUploadWidgetProps,
  CldUploadWidgetPropsOptions,
} from "next-cloudinary";
import Image from "next/image";
import { useSnackbar } from "notistack";

import Button from "app/components/shared/Button";
import Box from "app/components/shared/Box";
import IconButton from "app/components/shared/IconButton";
import Stack from "app/components/shared/Stack";

type CloudinaryImageType = {
  imageUrl: string;
  imagePublicId: string;
};
interface UploadedImagePreviewType {
  cloudinaryImage: CloudinaryImageType;
  destroyFunc: any;
  destroyOnSuccess: () => Promise<void>;
  snackbar: (err: string, object: object) => void;
  previewOptions?: {
    width?: number;
    height?: number;
    alt?: string;
  };
  isFullWidth: boolean;
}

function UploadedImagePreview(props: UploadedImagePreviewType) {
  const { imageUrl, imagePublicId } = props.cloudinaryImage;

  const handleDestroyingImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await props.destroyFunc.mutateAsync({ publicId: imagePublicId });
  };

  return (
    <>
      {props.isFullWidth ? (
        <Box sx={{ position: "relative", height: 325 }}>
          <CldImage
            sizes="100vw"
            alt="image preview"
            {...props.previewOptions}
            fill
            src={imageUrl}
            priority
          />
        </Box>
      ) : (
        <CldImage
          width="150"
          height="150"
          sizes="100vw"
          alt="image preview"
          {...props.previewOptions}
          src={imageUrl}
          priority
        />
      )}
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
  destroyFunc: any;
  destroyOnSuccess: () => Promise<void>;
  onUpload: (res) => Promise<void>;
  previewOptions?: {
    width?: number;
    height?: number;
    alt?: string;
  };
  imageOptions?: CldUploadWidgetPropsOptions;
  fullWidth?: boolean;
}

function UploadImage(props: UploadImageProps) {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: Show spinner for loading state
  return props.image ? (
    <UploadedImagePreview
      cloudinaryImage={props.image}
      destroyFunc={props.destroyFunc}
      destroyOnSuccess={props.destroyOnSuccess}
      snackbar={enqueueSnackbar}
      previewOptions={props?.previewOptions}
      isFullWidth={props.fullWidth || false}
    />
  ) : (
    <>
      <CldUploadWidget
        onError={(err) => {
          console.log(err);
          enqueueSnackbar("Image not uploaded", {
            variant: "error",
          });
        }}
        options={{
          minImageHeight: 250,
          minImageWidth: 250,
          ...props.imageOptions,
          cropping: true,
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
                alt="Upload image"
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
