import { useState, forwardRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Input } from "app/components/ui/input";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export const UploadImage = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] as unknown as File;
    const formData = new FormData();
    formData.set("file", file);
    console.log("RAN")

    try {
      const res = await fetch("/api/upload", {
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
    <div className="pt-8 flex items-center gap-4">
      <Avatar className="w-20 h-20">
        <AvatarImage src={imageUrl} />
        <AvatarFallback>SLY</AvatarFallback>
      </Avatar>

      <Input
        {...props}
        onChange={handleFileChange}
        id="headshot"
        type="file"
        accept="image/png, image/jpeg"
        ref={ref}
      />
    </div>
  );
})
