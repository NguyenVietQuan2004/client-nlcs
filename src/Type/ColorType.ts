//////////////////////////////-----COLOR TYPE-----//////////////////////////////

import z from "zod";

export const Color = z.object({
  _id: z.string(),
  name: z.string(),
  storeId: z.string(),
  value: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  COLOR BODY TYPE
export const ColorBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type ColorBodyType = z.TypeOf<typeof ColorBody>;

//  COLOR RES TYPE
export const ColorRes = z.object({
  data: Color,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ColorResType = z.TypeOf<typeof ColorRes>;

// CATEGORT TYPE
export type ColorType = z.TypeOf<typeof Color>;

// LIST COLOR BODY TYPE
export const ListColorBody = z.object({
  storeId: z.string(),
});
export type ListColorBodyType = z.TypeOf<typeof ListColorBody>;

// LIST COLOR RES TYPE
export const ListColorRes = z.object({
  data: z.array(Color),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListColorResType = z.TypeOf<typeof ListColorRes>;

//  CREATE COLOR BODY TYPE
export const CreateColorBody = z.object({
  storeId: z.string(),
  value: z.string(),
  name: z.string(),
});
export type CreateColorBodyType = z.TypeOf<typeof CreateColorBody>;

//  CREATE COLOR RES TYPE
export const CreateColorRes = z.object({
  data: Color,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateColorResType = z.TypeOf<typeof CreateColorRes>;

/// UPDATE COLOR BODY TYPE
export const UpdateColorBody = z.object({
  _id: z.string(),
  storeId: z.string(),
  value: z.string(),
  name: z.string(),
});
export type UpdateColorBodyType = z.TypeOf<typeof UpdateColorBody>;

/// UPDATE COLOR RES TYPE
export const UpdateColorRes = z.object({
  data: Color,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateColorResType = z.TypeOf<typeof UpdateColorRes>;

/// DELETE COLOR BODY TYPE
export const DeleteColorBody = z.object({
  _id: z.string(),
  storeId: z.string(),
});
export type DeleteColorBodyType = z.TypeOf<typeof DeleteColorBody>;

/// DELETE COLOR RES TYPE
export const DeleteColorRes = z.object({
  data: Color,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteColorResType = z.TypeOf<typeof DeleteColorRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
