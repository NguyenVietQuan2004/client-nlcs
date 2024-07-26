//////////////////////////////-----CATEGORY TYPE-----//////////////////////////////

import z from "zod";

//  CATEGORY BODY TYPE
export const CategoryBody = z.object({
  _id: z.string(),
  sessionToken: z.string(),
  storeId: z.string(),
});
export type CategoryBodyType = z.TypeOf<typeof CategoryBody>;

//  CATEGORY RES TYPE
export const CategoryRes = z.object({
  data: z.object({
    _id: z.string(),
    name: z.string(),
    storeId: z.string(),
    billboardId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CategoryResType = z.TypeOf<typeof CategoryRes>;

// CATEGORT TYPE
export type CategoryType = Omit<CategoryResType, "message" | "ok" | "statusCode">["data"];

// LIST CATEGORY BODY TYPE
export const ListCategoryBody = z.object({
  storeId: z.string(),
  sessionToken: z.string(),
});
export type ListCategoryBodyType = z.TypeOf<typeof ListCategoryBody>;

// LIST CATEGORY RES TYPE
export const ListCategoryRes = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      storeId: z.string(),
      billboardId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),

  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListCategoryResType = z.TypeOf<typeof ListCategoryRes>;

//  CREATE CATEGORY BODY TYPE
export const CreateCategoryBody = z.object({
  storeId: z.string(),
  billboardId: z.string(),
  name: z.string(),
});
export type CreateCategoryBodyType = z.TypeOf<typeof CreateCategoryBody>;

//  CREATE CATEGORY RES TYPE
export const CreateCategoryRes = z.object({
  data: z.object({
    _id: z.string(),
    name: z.string(),
    storeId: z.string(),
    billboardId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateCategoryResType = z.TypeOf<typeof CreateCategoryRes>;

/// UPDATE CATEGORY BODY TYPE
export const UpdateCategoryBody = z.object({
  _id: z.string(),
  storeId: z.string(),
  billboardId: z.string(),
  name: z.string(),
});
export type UpdateCategoryBodyType = z.TypeOf<typeof UpdateCategoryBody>;

/// UPDATE CATEGORY RES TYPE
export const UpdateCategoryRes = z.object({
  data: z.object({
    _id: z.string(),
    name: z.string(),
    storeId: z.string(),
    billboardId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateCategoryResType = z.TypeOf<typeof UpdateCategoryRes>;

/// DELETE CATEGORY BODY TYPE
export const DeleteCategoryBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type DeleteCategoryBodyType = z.TypeOf<typeof DeleteCategoryBody>;

/// DELETE CATEGORY RES TYPE
export const DeleteCategoryRes = z.object({
  data: z.object({
    _id: z.string(),
    name: z.string(),
    storeId: z.string(),
    billboardId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteCategoryResType = z.TypeOf<typeof DeleteCategoryRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
