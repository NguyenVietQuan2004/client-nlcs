//////////////////////////////-----BILLBOARD TYPE-----//////////////////////////////

import z from "zod";

//  BILLBOARD BODY TYPE
export const BillboardBody = z.object({
  _id: z.string(),
  sessionToken: z.string(),
  storeId: z.string(),
});
export type BillboardBodyType = z.TypeOf<typeof BillboardBody>;

//  BILLBOARD RES TYPE
export const BillboardRes = z.object({
  data: z.object({
    _id: z.string(),
    label: z.string(),
    image: z.string(),
    storeId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type BillboardResType = z.TypeOf<typeof BillboardRes>;

// BILLBOARD TYPE
export type BillboardType = Omit<BillboardResType, "message" | "ok" | "statusCode">["data"];

//  LIST BILLBOARD BODY TYPE
export const ListBillboardBody = z.object({
  storeId: z.string(),
  sessionToken: z.string(),
});
export type ListBillboardBodyType = z.TypeOf<typeof ListBillboardBody>;

//  LIST BILLBOARD RES TYPE
export const ListBillboardRes = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      label: z.string(),
      image: z.string(),
      storeId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListBillboardResType = z.TypeOf<typeof ListBillboardRes>;

// CREATE BILLBOARD BODY TYPE
export const CreateBillboardBody = z.object({
  label: z.string(),
  image: z.string(),
  storeId: z.string(),
});
export type CreateBillboardBodyType = z.TypeOf<typeof CreateBillboardBody>;

// CREATE BILLBOARD RES TYPE
export const CreateBillboardRes = z.object({
  data: z.object({
    _id: z.string(),
    label: z.string(),
    image: z.string(),
    storeId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateBillboardResType = z.TypeOf<typeof CreateBillboardRes>;

// UPDATE BILLBOARD RES TYPE
export const UpdateBillboardBody = z.object({
  storeId: z.string(),
  _id: z.string(),
  label: z.string(),
  image: z.string(),
});
export type UpdateBillboardBodyType = z.TypeOf<typeof UpdateBillboardBody>;
// UPDATE BILLBOARD RES TYPE
export const UpdateBillboardRes = z.object({
  data: z.object({
    _id: z.string(),
    label: z.string(),
    image: z.string(),
    storeId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateBillboardResType = z.TypeOf<typeof UpdateBillboardRes>;

//  DELETE BILLBOARD BODY TYPE
export const DeleteBillboardBody = z.object({
  storeId: z.string(),
  _id: z.string(),
});
export type DeleteBillboardBodyType = z.TypeOf<typeof DeleteBillboardBody>;

// DELETE BILLBOARD RES TYPE
export const DeleteBillboardRes = z.object({
  data: z.object({
    _id: z.string(),
    label: z.string(),
    image: z.string(),
    storeId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type DeleteBillboardResType = z.TypeOf<typeof DeleteBillboardRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
