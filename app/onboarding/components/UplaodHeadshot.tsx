import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useMutation } from "@blitzjs/rpc";

import completeOnboardingHeadshotMutation from "../mutations/completeOnboardingHeadshotMutation";

import Button from "app/core/components/shared/Button";
import Stack from "app/core/components/shared/Stack";
import Typography from "app/core/components/shared/Typography";

interface UploadHeadshotPreviewType {
  headshotUrl: string;
}

function UploadHeadshotPreview(props: UploadHeadshotPreviewType) {
  const [uploadHeadshot] = useMutation(completeOnboardingHeadshotMutation);

  const handleUploadingHeadshot = async () => {
    await uploadHeadshot({ url: props.headshotUrl });
  };
  return (
    <>
      <div>
        <CldImage
          width="320"
          height="320"
          src={props.headshotUrl}
          sizes="100vw"
          alt="chef headshot"
        />
      </div>
      <Stack direction="row">
        <Button
          label="continue onboarding"
          variant="outlined"
          onClick={handleUploadingHeadshot}
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
  const [headshotUrl, setHeadshotUrl] = useState<string>("");
  console.log("HEADSHOT_URL", headshotUrl);
  return headshotUrl ? (
    <UploadHeadshotPreview headshotUrl={headshotUrl} />
  ) : (
    <>
      <Typography>Please upload a headshot with a solid background.</Typography>
      <CldUploadWidget
        uploadPreset="chef_profile_pic"
        onError={(err) => console.log("ERROR uploading headshot", err)}
        onUpload={(res) => {
          console.log(res);
          setHeadshotUrl(res?.info.secure_url);
        }}
        options={{
          cropping: true,
          croppingCoordinatesMode: "face",
          minImageHeight: 250,
          minImageWidth: 250,
          sources: ["local"],
          resourceType: "image",
          // clientAllowedFormats: ["webp", "jpg", "jpeg", "png"],
        }}
      >
        {({ open }) => {
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
              // disabled={isLoading}
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
