"use client";
import z from "zod";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { storeAPI } from "@/apiRequest/storeAPI";
import AlertModal from "@/components/alert-modal";
import { toast } from "@/components/ui/use-toast";
import { storeResType } from "@/app/Type/AuthTypes";
import useModalConfirm from "@/hooks/useModalConfirm";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@/components/loadingButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface SettingFormProps {
  initData: storeResType;
}

function SettingForm({ initData }: SettingFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsShowModalConfirm } = useModalConfirm();
  const formSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Name must be contain at least 1 character",
      })
      .refine((name) => name !== initData.data.name, {
        message: "New name must be different from the old name",
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData.data.name,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await storeAPI.updateStore({ storeId: initData.data._id, name: data.name });
      router.refresh();
      toast({
        title: "Store updated.",
        variant: "success",
      });
    } catch (error: any) {
      console.error("UPDATE_STORE_ERROR", error);
      toast({
        title: error.message || "Something went wrong.",
        variant: "destructiveCustom",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteStore = async () => {
    try {
      setIsLoading(true);
      await storeAPI.deleteStore({ storeId: initData.data._id });
      toast({
        title: "Delete store success.",
        variant: "success",
      });
      router.refresh();
    } catch (error: any) {
      toast({
        title: error.message || "Something went wrong.",
        variant: "destructiveCustom",
      });
      console.error("DELETE_STORE_ERROR", error);
    } finally {
      setIsLoading(false);
      setIsShowModalConfirm(false);
    }
  };

  return (
    <>
      <AlertModal action="Delete" variant="destructive" onConfirm={handleDeleteStore} isLoading={isLoading} />
      <div className="flex items-center border-b pb-4">
        <Heading title="Setting" description="Manage store preferences" />
        <Button
          className={buttonVariants({
            className: "!p-3 ml-auto",
            variant: "destructive",
          })}
          onClick={() => setIsShowModalConfirm(true)}
        >
          <Trash className="w-5 h-5" />
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name store" {...field} className="select-none" disabled={isLoading} />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          <div className=" mt-4  ">
            <Button type="submit" className="min-w-[118px]" disabled={isLoading}>
              {isLoading ? <LoadingButton /> : "Save change"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default SettingForm;
