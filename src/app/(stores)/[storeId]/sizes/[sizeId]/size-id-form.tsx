"use client";

import z from "zod";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFormState } from "react-hook-form";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { SizeResType } from "@/Type/SizeTypes";
import { sizeAPI } from "@/apiRequest/sizeAPI";
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { handlError } from "@/components/handle-error";
import LoadingButton from "@/components/loading-button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface SizeFormProps {
  initObjectData: SizeResType | null;
}
// không tạo type riêng vì đang sử dụng  cả update và create chung 1 component
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be contain at least 1 character",
  }),
  value: z.string().min(1, {
    message: "Name must be contain at least 1 character",
  }),
});

function SizeForm({ initObjectData }: SizeFormProps) {
  const initData = initObjectData?.data;
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // check xem đang muốn update hay create dựa vào có truyền data đầu vào không
  const action = initData ? "Save change" : "Create";
  const title = initData ? "Edit size" : "Create size";
  const description = initData ? "Change your size" : "Add a new size";
  const toastMessage = initData ? "Updated success" : "Create success";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData?.name || "",
      value: initData?.value || "",
    },
  });
  const { isDirty } = useFormState({ control: form.control });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (initData) {
        if (!isDirty) {
          return form.setError("name", { message: "Nothing has change." });
        }
        await sizeAPI.updateSize({
          storeId: params.storeId as string,
          name: data.name,
          value: data.value,
          _id: initData._id,
        });
      } else {
        await sizeAPI.createSize({
          storeId: params.storeId as string,
          name: data.name,
          value: data.value,
        });
      }
      // thứ tự 2 route này quan trọng
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error) {
      handlError({ consoleError: "UPDATE_CREATE_SIZE_ERROR", error, isToast: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSize = async () => {
    try {
      setIsLoading(true);
      await sizeAPI.deleteSize({
        storeId: params.storeId as string,
        _id: params.sizeId as string,
      });
      toast({
        title: "Delete size success.",
        variant: "success",
      });
      // thứ tự 2 route này quan trọng
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    } catch (error) {
      handlError({
        consoleError: "DELETE_SIZE_ERROR",
        error,
        isToast: true,
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <>
        <AlertModal
          open={open}
          onClose={() => setOpen(false)}
          action="Delete"
          variant="destructive"
          onConfirm={handleDeleteSize}
          isLoading={isLoading}
        />
        <div className="flex items-center border-b pb-4">
          <Heading title={title} description={description} />
          {initData && (
            <Button
              className={buttonVariants({
                className: "!p-3 ml-auto",
                variant: "destructive",
              })}
              onClick={() => setOpen(true)}
              disabled={isLoading}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )}
        </div>
      </>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[320px] mt-4 space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Size name</FormLabel>
                <FormControl>
                  <Input placeholder="Size name" {...field} className="select-none" disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Size value</FormLabel>
                <FormControl>
                  <Input placeholder="Size value" {...field} className="select-none" disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className=" mt-8 ">
            <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SizeForm;
