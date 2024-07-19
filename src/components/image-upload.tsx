"use client";
import Image from "next/image";
import { File } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import LoadingButton from "@/components/loadingButton";
import { Button, buttonVariants } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  isLoading: boolean;
  onChange: (url: any) => void;
  onRemove: () => void;
}

export default function ImageUpload({ value, isLoading, onChange, onRemove }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      {value.map((item) => {
        return (
          <div key={item} className="w-[200px] h-[200px] object-cover overflow-hidden">
            <Image
              width={200}
              height={200}
              src={item}
              alt=""
              className="w-[200px] h-[200px] object-cover rounded-sm"
              priority
            />
          </div>
        );
      })}
      <CldUploadWidget onUpload={onUpload} uploadPreset="u91fw9fp">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              onClick={onClick}
              className={buttonVariants({
                variant: "secondary",
                className: "text-black mt-2",
              })}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingButton />
              ) : (
                <>
                  <File className="h-4 w-4 mr-2 " />
                  Upload an image
                </>
              )}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
