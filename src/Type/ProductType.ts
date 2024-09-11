//////////////////////////////-----PRODUCT TYPE-----//////////////////////////////

import z from "zod";
import { Color, ColorBody } from "@/Type/ColorType";
import { Size } from "@/Type/SizeTypes";
import { Category } from "@/Type/CategoryTypes";

export const Product = z.object({
  _id: z.string(),
  images: z.array(z.string()),
  name: z.string(),
  storeId: z.string(),
  arrayPrice: z.array(
    z.object({
      size: z.string(),
      price: z.number(),
      colors: z.array(z.string()),
      amount: z.number(),
    })
  ),
  categoryId: z.object({
    _id: z.string(),
    name: z.string(),
    storeId: z.string(),
    billboardId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  PRODUCT BODY TYPE
export const ProductBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type ProductBodyType = z.TypeOf<typeof ProductBody>;

//  PRODUCT RES TYPE
export const ProductRes = z.object({
  data: z.object({
    product: Product,
    listColor: z.array(Color),
    listSize: z.array(Size),
    listCategory: z.array(Category),
    productsRelative: z.array(Product),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ProductResType = z.TypeOf<typeof ProductRes>;

// PRODUCT TYPE

export type ProductType = z.TypeOf<typeof Product>;

// LIST PRODUCT BODY TYPE
export const ListProductBody = z.object({
  storeId: z.string(),
});
export type ListProductBodyType = z.TypeOf<typeof ListProductBody>;

// LIST PRODUCT RES TYPE
export const ListProductRes = z.object({
  data: z.object({
    listProduct: z.array(Product),
    totalProduct: z.number(),
    listColor: z.array(Color),
    listSize: z.array(Size),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListProductResType = z.TypeOf<typeof ListProductRes>;

//  CREATE PRODUCT BODY TYPE
export const CreateProductBody = z.object({
  images: z.array(z.string()),
  name: z.string(),
  storeId: z.string(),
  arrayPrice: z.array(
    z.object({
      size: z.string(),
      price: z.number(),
      colors: z.array(z.string()),
    })
  ),
  categoryId: z.string(),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
});
export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

//  CREATE PRODUCT RES TYPE
export const CreateProductRes = z.object({
  data: Product,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateProductResType = z.TypeOf<typeof CreateProductRes>;

/// UPDATE PRODUCT BODY TYPE
export const UpdateProductBody = z.object({
  _id: z.string(),
  images: z.array(z.string()),
  name: z.string(),
  storeId: z.string(),
  arrayPrice: z.array(
    z.object({
      size: z.string(),
      price: z.number(),
      colors: z.array(z.string()),
    })
  ),
  categoryId: z.string(),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
});
export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>;

/// UPDATE PRODUCT RES TYPE
export const UpdateProductRes = z.object({
  data: Product,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateProductResType = z.TypeOf<typeof UpdateProductRes>;

/// DELETE PRODUCT BODY TYPE
export const DeleteProductBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type DeleteProductBodyType = z.TypeOf<typeof DeleteProductBody>;

/// DELETE PRODUCT RES TYPE
export const DeleteProductRes = z.object({
  data: Product,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteProductResType = z.TypeOf<typeof DeleteProductRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
