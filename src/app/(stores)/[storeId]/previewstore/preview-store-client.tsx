"use client";

import z from "zod";
import Image from "next/image";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/image-upload";
import LoadingButton from "@/components/loading-button";
import { handlError } from "@/components/handle-error";
import { ImagesHomePageResType } from "@/Type/ImagesHomePage";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImagesHomePageAPI } from "@/apiRequest/ImagesHomePageAPI";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface PreviewStoreClientProps {
  initObjectData: ImagesHomePageResType | null;
}

const formSchema = z.object({
  billboardBST: z.string().min(1, {
    message: "You have to upload at least 1 image.",
  }),
  billboardFeature: z.array(z.string()).length(3, {
    message: "You must be upload 3 images.",
  }),
  backgroundInsurancce: z.string().min(1, {
    message: "You have to upload at least 1 image.",
  }),
});
function PreviewStoreClient({ initObjectData }: PreviewStoreClientProps) {
  const initData = initObjectData?.data.ImagesHomePage;
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billboardBST: initData?.billboardBST || "",
      billboardFeature: initData?.billboardFeature || [],
      backgroundInsurancce: initData?.backgroundInsurance || "",
    },
  });
  const action = initData ? "Save change" : "Create";
  const toastMessage = initData ? "Updated success" : "Create success";
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initData) {
        await ImagesHomePageAPI.updateImagesHomePage({
          storeId: params.storeId as string,
          billboardBST: data.billboardBST,
          billboardFeature: data.billboardFeature,
          backgroundInsurance: data.backgroundInsurancce,
        });
      } else {
        await ImagesHomePageAPI.createImagesHomePage({
          storeId: params.storeId as string,
          billboardBST: data.billboardBST,
          billboardFeature: data.billboardFeature,
          backgroundInsurance: data.backgroundInsurancce,
        });
      }
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error) {
      handlError({ consoleError: "UPDATE_CREATE_BILLBOARD_ERROR", error, isToast: true });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e: React.KeyboardEvent<any>) => {
          e.key === "Enter" && e.preventDefault();
        }}
      >
        <div className="">
          <div className="flex items-center border-b pb-4">
            <Heading title="Upload" description="Upload another image for homepage" />
          </div>
          <div className=" mt-8 ">
            <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : action}
            </Button>
          </div>
          <div className="border mt-10 w-[800px] mx-auto">
            <div className="text-center border">Navbar</div>
            <div className="flex justify-center ">
              <FormField
                control={form.control}
                name="billboardFeature"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <ImageUpload
                        isLoading={isLoading}
                        value={field.value ? field.value : []}
                        onChange={(url) => field.onChange([...field.value, url])}
                        onRemove={(url) => field.onChange([...field.value.filter((item: any) => item !== url)])}
                      >
                        <div className="w-full grid grid-cols-3 gap-1 mt-4">
                          {field.value.map((item) => (
                            <div key={item} className="relative border flex justify-center items-center ">
                              <Image
                                alt=""
                                src={item}
                                width={1000}
                                height={1000}
                                className="w-full aspect-[2/3] max-h-full object-cover"
                              />
                              <Button
                                className={buttonVariants({
                                  className: "absolute z-50 top-2 right-2 px-2",
                                  variant: "destructive",
                                  size: "sm",
                                })}
                                onClick={() => field.onChange([...field.value.filter((url: any) => url !== item)])}
                              >
                                <TrashIcon className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </ImageUpload>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 gap-1 mt-4">
              {!form.getValues("billboardFeature").length &&
                [1, 2, 3].map((item) => (
                  <div key={item} className="border flex justify-center items-center w-full aspect-[2/3]">
                    Feature billboard
                  </div>
                ))}
            </div>

            <FormField
              control={form.control}
              name="backgroundInsurancce"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold"></FormLabel>
                  <FormControl>
                    <ImageUpload
                      isLoading={isLoading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      title="Upload your background insurance"
                    >
                      {field.value && (
                        <div className="relative border w-full flex justify-center items-center ">
                          <Image
                            alt=""
                            src={field.value}
                            width={1000}
                            height={1000}
                            className="w-full h-[400px]  object-cover"
                          />
                          <Button
                            className={buttonVariants({
                              className: "absolute z-50 top-2 right-2 px-2",
                              variant: "destructive",
                              size: "sm",
                            })}
                            onClick={() => field.onChange("")}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </ImageUpload>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <div className=" mt-4 w-full">
              {!form.getValues("backgroundInsurancce").length && (
                <div className="border flex justify-center items-center w-full h-[400px]"> Background insurance</div>
              )}
            </div>

            <FormField
              control={form.control}
              name="billboardBST"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold"></FormLabel>
                  <FormControl>
                    <ImageUpload
                      isLoading={isLoading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      title="Upload your billboard BST "
                    >
                      {field.value && (
                        <div className="relative border w-full flex justify-center items-center ">
                          <Image
                            alt=""
                            src={field.value}
                            width={1000}
                            height={1000}
                            className="w-full h-[400px]  object-cover"
                          />
                          <Button
                            className={buttonVariants({
                              className: "absolute z-50 top-2 right-2 px-2",
                              variant: "destructive",
                              size: "sm",
                            })}
                            onClick={() => field.onChange("")}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </ImageUpload>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <div className=" mt-4 w-full">
              {!form.getValues("billboardBST").length && (
                <div className="border flex justify-center items-center w-full h-[400px]"> Billboard BST</div>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default PreviewStoreClient;
