"use client";
import z from "zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import ImageUpload from "@/components/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import useModalConfirm from "@/hooks/useModalConfirm";
import LoadingButton from "@/components/loadingButton";
import { BillboardResType } from "@/app/Type/AuthTypes";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface BillboardFormProps {
  initObjectData: BillboardResType | null;
}
const formSchema = z.object({
  label: z.string().min(1, {
    message: "Name must be contain at least 1 character",
  }),
  image: z.string(),
});

function BillboardForm({ initObjectData }: BillboardFormProps) {
  const initData = initObjectData?.data;
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsShowModalConfirm } = useModalConfirm();

  const action = initData ? "Save change" : "Create";
  const title = initData ? "Edit billboard" : "Create billboard";
  const description = initData ? "Change your billboard" : "Add a new billboard";
  const toastMessage = initData ? "Updated success" : "Create success";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: initData?.label || "",
      image: initData?.image || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("iamge", data.image);
    if (!data.image) {
      return form.setError("image", {
        message: "Back ground image is require",
      });
    }
    try {
      setIsLoading(true);
      if (initData) {
        await billboardAPI.updateBillboard({
          storeId: params.storeId as string,
          label: data.label,
          image: data.image,
          _id: initData._id,
        });
      } else {
        await billboardAPI.createBillboard({
          storeId: params.storeId as string,
          label: data.label,
          image: data.image,
        });
      }
      // create or edit
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error: any) {
      console.error("UPDATE_CREATE_BILLBOARD_ERROR", error);
      toast({
        title: error.message || "Something went wrong.",
        variant: "destructiveCustom",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteBillboard = async () => {
    try {
      setIsLoading(true);
      await billboardAPI.deleteBillboard({
        storeId: params.storeId as string,
        billboardId: params.billboardId as string,
      });
      toast({
        title: "Delete billboard success.",
        variant: "success",
      });
      router.push(`/${params.storeId}/billboards`);
      router.refresh();
    } catch (error: any) {
      toast({
        title: error.message || "Something went wrong.",
        variant: "destructiveCustom",
      });
      console.error("DELETE_BILLBOARD_ERROR", error);
    } finally {
      setIsLoading(false);
      setIsShowModalConfirm(false);
    }
  };

  return (
    <>
      <>
        <AlertModal action="Delete" variant="destructive" onConfirm={handleDeleteBillboard} isLoading={isLoading} />
        <div className="flex items-center border-b pb-4">
          <Heading title={title} description={description} />
          {initData && (
            <Button
              className={buttonVariants({
                className: "!p-3 ml-auto",
                variant: "destructive",
              })}
              onClick={() => setIsShowModalConfirm(true)}
              disabled={isLoading}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )}
        </div>
      </>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] mt-4 space-y-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    isLoading={isLoading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Label</FormLabel>
                <FormControl>
                  <Input placeholder="Billboard label" {...field} className="select-none" disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className=" mt-8 ">
            <Button type="submit" className="min-w-[80px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default BillboardForm;
