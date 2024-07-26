"use client";
import Image from "next/image";
import { File, TrashIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import LoadingButton from "@/components/loadingButton";
import { Button, buttonVariants } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  isLoading: boolean;
  onChange: (url: string) => void;
  onRemove: (url?: string) => void;
}

export default function ImageUpload({ value, isLoading, onChange, onRemove }: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="">
      <div className="flex gap-6 flex-wrap">
        {value.map((item) => {
          return (
            <div key={item} className="relative w-[200px] h-[200px] object-cover overflow-hidden">
              <Image
                width={200}
                height={200}
                src={item}
                alt=""
                className="w-[200px] h-[200px] object-cover rounded-sm"
                priority
              />
              <Button
                className={buttonVariants({
                  className: "absolute z-50 top-2 right-2 px-2",
                  variant: "destructive",
                  size: "sm",
                })}
                onClick={() => onRemove(item)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            </div>
          );
        })}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="u91fw9fp" options={{ multiple: true }}>
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
