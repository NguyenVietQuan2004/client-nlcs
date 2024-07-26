"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { PlusIcon, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import AlertModal from "@/components/alert-modal";
import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { ProductResType } from "@/Type/ProductType";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/image-upload";
import MultiSelect from "@/components/multi-select";
import { productAPI } from "@/apiRequest/productAPI";
import LoadingButton from "@/components/loadingButton";
import { handlError } from "@/components/handle-error";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import { Button, buttonVariants } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createListDefaultValueForm, createListSchemaForm, createUniqueArray, formatDefaultValue } from "@/lib/utils";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ProductFormProps {
  initObjectData: ProductResType | null;
  listSizeObject: ListSizeResType | null;
  listColorObject: ListColorResType | null;
  listCategoryObject: ListCategoryResType | null;
}

function ProductForm({ initObjectData, listCategoryObject, listSizeObject, listColorObject }: ProductFormProps) {
  const initData = initObjectData?.data;
  const listSize = listSizeObject?.data;
  const listColor = listColorObject?.data;
  const listCategory = listCategoryObject?.data;

  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMouted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIncrease, setIsIncrease] = useState(true);
  const [numSize, setNumsize] = useState(initData?.arrayPrice.length || 1);

  // check xem đang muốn update hay create dựa vào có truyền data đầu vào không
  const action = initData ? "Save change" : "Create";
  const title = initData ? "Edit product" : "Create product";
  const toastMessage = initData ? "Updated success" : "Create success";
  const description = initData ? "Change your product" : "Add a new product";

  // size
  const sizesArray = initData?.arrayPrice.map((item) => item.size);
  let defaultValueListSize: Array<any> = createListDefaultValueForm(numSize, "size", "");
  // price
  const pricesArray = initData?.arrayPrice.map((item) => item.price);
  let defaultValueListPrice: Array<any> = createListDefaultValueForm(numSize, "price", 0);

  // color
  const colorsArray = initData?.arrayPrice.map((item) => item.colors);
  let defaultValueListColor: Array<any> = createListDefaultValueForm(numSize, "color", []);

  // nếu có data đầu vào thì ghi đè lại nhưng size lúc này chỉ bằng initSize, khi vào vô useEffect mới thêm vào size mới
  if (initData) {
    defaultValueListSize = sizesArray!.map((item, index) => {
      const sizeIndex = "size" + (index + 1);
      return {
        [sizeIndex]: item,
      };
    });
    defaultValueListPrice = pricesArray!.map((item, index) => {
      const priceIndex = "price" + (index + 1);
      return {
        [priceIndex]: item,
      };
    });
    defaultValueListColor = colorsArray!.map((item, index) => {
      const colorIndex = "color" + (index + 1);
      return {
        [colorIndex]: item,
      };
    });
  }

  // type
  const listSizeSchema: any = createListSchemaForm(
    numSize,
    "size",
    z.string().min(1, { message: "Size cannot be emty" })
  );
  const listPriceSchema: any = createListSchemaForm(
    numSize,
    "price",
    z.coerce
      .number({
        message: "Price must be a number",
      })
      .min(1, { message: "Price cannot be emty" })
  );
  const listColorSchema: any = createListSchemaForm(
    numSize,
    "color",
    z.array(z.string()).min(1, { message: "Colors cannot be emty" })
  );
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Name must be contain at least 1 character",
    }),
    ...listPriceSchema,
    category: z.string().min(1, { message: "Category cannot be emty" }),
    ...listSizeSchema,
    ...listColorSchema,
    isFeature: z.boolean(),
    isArchive: z.boolean(),
    images: z.array(z.string()).min(1, {
      message: "Images must be contain at least 1 picture.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initData?.name || "",
      images: initData?.images || [],
      ...formatDefaultValue(defaultValueListSize),
      ...formatDefaultValue(defaultValueListPrice),
      ...formatDefaultValue(defaultValueListColor),
      category: initData?.categoryObject.categoryId || "",
      isFeature: initData?.isFeature || false,
      isArchive: initData?.isArchive || false,
    },
  });

  // initdata
  useEffect(() => {
    setIsMouted(true);
  }, []);
  useEffect(() => {
    // tránh lần đầu mounted bị gọi luôn hàm và set giá trị của numsize hiện tại rỗng
    if (!isMounted) return;
    console.log(isIncrease, numSize);
    const sizeIndex = `size${numSize}`;
    const priceIndex = `price${numSize}`;
    const colorIndex = `color${numSize}`;
    const objectPrice = {
      [sizeIndex]: "",
      [priceIndex]: 0,
      [colorIndex]: [],
    };
    if (isIncrease) {
      // thứ tự quan trọng vì ghi đè lại
      form.reset({
        ...form.getValues(),
        ...objectPrice,
      });
    } else {
      const sizeIndex = `size${numSize + 1}`;
      const priceIndex = `price${numSize + 1}`;
      const colorIndex = `color${numSize + 1}`;
      const { [sizeIndex]: a, [colorIndex]: b, [priceIndex]: c, ...clenarFormValue } = form.getValues();
      form.reset({
        ...clenarFormValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numSize]);
  // lỗi thì thêm form vào
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const categoryObject = listCategory?.find((item) => item._id === data.category);
    const arrayPrice = createUniqueArray(numSize).map((_, index) => {
      return {
        size: data[`size${index + 1}`],
        price: data[`price${index + 1}`],
        colors: data[`color${index + 1}`],
      };
    });
    try {
      if (!initData) {
        await productAPI.createProduct({
          name: data.name,
          images: data.images,
          storeId: params.storeId as string,
          arrayPrice,
          categoryObject: {
            categoryId: categoryObject?._id || "",
            categoryName: categoryObject?.name || "",
          },
          isFeature: data.isFeature,
          isArchive: data.isArchive,
        });
      } else {
        await productAPI.updateProduct({
          _id: initData._id,
          name: data.name,
          images: data.images,
          storeId: params.storeId as string,
          arrayPrice,
          categoryObject: {
            categoryId: categoryObject?._id || "",
            categoryName: categoryObject?.name || "",
          },
          isFeature: data.isFeature,
          isArchive: data.isArchive,
        });
      }
      // thứ tự 2 route này quan trọng
      router.push(`/${params.storeId}/products`);
      router.refresh();
      toast({
        title: toastMessage,
        variant: "success",
      });
    } catch (error) {
      handlError({ consoleError: "UPDATE_CREATE_ERROR", error: error, isToast: true });
    }
  };
  const handleDeleteProduct = async () => {
    try {
      setIsLoading(true);
      await productAPI.deleteProduct({
        storeId: params.storeId as string,
        _id: params.productId as string,
      });
      toast({
        title: "Delete product success.",
        variant: "success",
      });
      // thứ tự 2 route này quan trọng
      router.push(`/${params.storeId}/products`);
      router.refresh();
    } catch (error) {
      handlError({
        consoleError: "DELETE_PRODUCT_ERROR",
        error,
        isToast: true,
      });
    } finally {
      setOpen(false);
      setIsLoading(false);
    }
  };
  const handleIncreaseForm = () => {
    setIsIncrease(true);
    setNumsize(numSize + 1);
  };
  const handleDecreaseForm = () => {
    setIsIncrease(false);
    setNumsize(numSize - 1);
  };
  return (
    <>
      <>
        <AlertModal
          open={open}
          onClose={() => setOpen(false)}
          action="Delete"
          variant="destructive"
          onConfirm={handleDeleteProduct}
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" mt-4 space-y-6"
          onKeyDown={(e: React.KeyboardEvent<any>) => {
            e.key === "Enter" && e.preventDefault();
          }}
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? field.value : []}
                    isLoading={isLoading}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) => field.onChange([...field.value.filter((item: any) => item !== url)])}
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                      accept="number"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="!h-[52px]">
                          <SelectValue placeholder="Choose one category..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listCategory?.map((category) => (
                          <SelectItem key={category._id} value={`${category._id}`}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <div></div>

            {createUniqueArray(numSize).map((value: any, index) => {
              return (
                <React.Fragment key={value}>
                  <FormField
                    control={form.control}
                    name={`size${index + 1}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Size{index + 1}</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="!h-[52px]">
                                <SelectValue placeholder="Choose one size..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {listSize?.map((size) => (
                                <SelectItem key={size._id} value={`${size.value}`}>
                                  {size.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`color${index + 1}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Color{index + 1}</FormLabel>
                        <FormControl>
                          <MultiSelect
                            values={field.value}
                            listColor={listColor}
                            onChange={(name) => field.onChange([...field.value, name])}
                            onRemove={(name) => field.onChange([...field.value.filter((color: any) => color !== name)])}
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`price${index + 1}` as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Price{index + 1}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Price"
                            {...field}
                            className="h-[52px] !ring-0  !ring-offset-0 !outline-none pl-4 w-full"
                            accept="number"
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    )}
                  />
                </React.Fragment>
              );
            })}
            <div className="flex gap-x-4  items-center">
              {numSize !== listSize?.length && (
                <Button
                  className={buttonVariants({
                    className: "align-bottom p-4 gap-x-2",
                    variant: "secondary",
                  })}
                  onClick={handleIncreaseForm}
                  type="button"
                >
                  <span>Add size </span>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              )}
              {numSize !== 1 && (
                <Button
                  className={buttonVariants({
                    className: "align-bottom p-4 ",
                    variant: "secondary",
                  })}
                  onClick={handleDecreaseForm}
                  type="button"
                >
                  Delete
                </Button>
              )}
            </div>

            <FormField
              control={form.control}
              name="isFeature"
              render={({ field }) => (
                <FormItem className="flex self-end items-start space-x-3 space-y-0 rounded-md border p-4 ">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-semibold">Featured</FormLabel>
                    <FormDescription>This product will appear in the home page.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchive"
              render={({ field }) => (
                <FormItem className="flex self-end  items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-semibold">Archived</FormLabel>
                    <FormDescription>This product will not appear any where in store.</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
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

export default ProductForm;
