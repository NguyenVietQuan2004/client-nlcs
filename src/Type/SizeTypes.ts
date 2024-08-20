//////////////////////////////-----SIZE TYPE-----//////////////////////////////

import z from "zod";

export const Size = z.object({
  _id: z.string(),
  name: z.string(),
  storeId: z.string(),
  value: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  SIZE BODY TYPE
export const SizeBody = z.object({
  _id: z.string(),
  sessionToken: z.string(),
  storeId: z.string(),
});
export type SizeBodyType = z.TypeOf<typeof SizeBody>;

//  SIZE RES TYPE
export const SizeRes = z.object({
  data: Size,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type SizeResType = z.TypeOf<typeof SizeRes>;

// CATEGORT TYPE
export type SizeType = z.TypeOf<typeof Size>;

// LIST SIZE BODY TYPE
export const ListSizeBody = z.object({
  storeId: z.string(),
  sessionToken: z.string(),
});
export type ListSizeBodyType = z.TypeOf<typeof ListSizeBody>;

// LIST SIZE RES TYPE
export const ListSizeRes = z.object({
  data: z.array(Size),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListSizeResType = z.TypeOf<typeof ListSizeRes>;

//  CREATE SIZE BODY TYPE
export const CreateSizeBody = z.object({
  storeId: z.string(),
  value: z.string(),
  name: z.string(),
});
export type CreateSizeBodyType = z.TypeOf<typeof CreateSizeBody>;

//  CREATE SIZE RES TYPE
export const CreateSizeRes = z.object({
  data: Size,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateSizeResType = z.TypeOf<typeof CreateSizeRes>;

/// UPDATE SIZE BODY TYPE
export const UpdateSizeBody = z.object({
  _id: z.string(),
  storeId: z.string(),
  value: z.string(),
  name: z.string(),
});
export type UpdateSizeBodyType = z.TypeOf<typeof UpdateSizeBody>;

/// UPDATE SIZE RES TYPE
export const UpdateSizeRes = z.object({
  data: Size,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateSizeResType = z.TypeOf<typeof UpdateSizeRes>;

/// DELETE SIZE BODY TYPE
export const DeleteSizeBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type DeleteSizeBodyType = z.TypeOf<typeof DeleteSizeBody>;

/// DELETE SIZE RES TYPE
export const DeleteSizeRes = z.object({
  data: Size,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteSizeResType = z.TypeOf<typeof DeleteSizeRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
