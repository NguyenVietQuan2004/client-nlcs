//////////////////////////////-----PRODUCT TYPE-----//////////////////////////////

import z from "zod";

//  PRODUCT BODY TYPE
export const ProductBody = z.object({
  _id: z.string(),
  sessionToken: z.string(),
  storeId: z.string(),
});
export type ProductBodyType = z.TypeOf<typeof ProductBody>;

//  PRODUCT RES TYPE
export const ProductRes = z.object({
  data: z.object({
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
    categoryObject: z.object({
      categoryId: z.string(),
      categoryName: z.string(),
    }),
    isFeature: z.boolean(),
    isArchive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ProductResType = z.TypeOf<typeof ProductRes>;

// PRODUCT TYPE
export type ProductType = Omit<ProductResType, "message" | "ok" | "statusCode">["data"];

// LIST PRODUCT BODY TYPE
export const ListProductBody = z.object({
  storeId: z.string(),
  sessionToken: z.string(),
});
export type ListProductBodyType = z.TypeOf<typeof ListProductBody>;

// LIST PRODUCT RES TYPE
export const ListProductRes = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      storeId: z.string(),
      images: z.array(z.string()),
      arrayPrice: z.array(
        z.object({
          size: z.string(),
          price: z.number(),
          colors: z.array(z.string()),
        })
      ),
      categoryObject: z.object({
        categoryId: z.string(),
        categoryName: z.string(),
      }),
      isFeature: z.boolean(),
      isArchive: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListProductResType = z.TypeOf<typeof ListProductRes>;

//  CREATE PRODUCT BODY TYPE
///////////////////////////////////////// casi nayf chua chinh
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
  categoryObject: z.object({
    categoryId: z.string(),
    categoryName: z.string(),
  }),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
});
export type CreateProductBodyType = z.TypeOf<typeof CreateProductBody>;

//  CREATE PRODUCT RES TYPE
export const CreateProductRes = z.object({
  data: z.object({
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
    categoryObject: z.object({
      categoryId: z.string(),
      categoryName: z.string(),
    }),
    isFeature: z.boolean(),
    isArchive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateProductResType = z.TypeOf<typeof CreateProductRes>;

/// UPDATE PRODUCT BODY TYPE
///////////////////////// cai nay chua chinh
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
  categoryObject: z.object({
    categoryId: z.string(),
    categoryName: z.string(),
  }),
  isFeature: z.boolean(),
  isArchive: z.boolean(),
});
export type UpdateProductBodyType = z.TypeOf<typeof UpdateProductBody>;

/// UPDATE PRODUCT RES TYPE
export const UpdateProductRes = z.object({
  data: z.object({
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
    categoryObject: z.object({
      categoryId: z.string(),
      categoryName: z.string(),
    }),
    isFeature: z.boolean(),
    isArchive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
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
  data: z.object({
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
    categoryObject: z.object({
      categoryId: z.string(),
      categoryName: z.string(),
    }),
    isFeature: z.boolean(),
    isArchive: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteProductResType = z.TypeOf<typeof DeleteProductRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
