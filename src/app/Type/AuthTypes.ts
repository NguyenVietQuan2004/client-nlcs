import z from "zod";

// login

const LoginBody = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

const LoginRes = z.object({
  data: z.object({
    id: z.string(),
    email: z.string(),
    userName: z.string(),
    accessToken: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type LoginResType = z.TypeOf<typeof LoginRes>;

// login firebase
const LoginBodyFirebase = z.object({
  id: z.string(),
  userName: z.string(),
  accessToken: z.string(),
});
export type LoginBodyFirebaseType = z.TypeOf<typeof LoginBodyFirebase>;

// register
const RegisterBodyType = z.object({
  email: z.string(),
  userName: z.string(),
  password: z.string(),
});
export type RegisterBodyType = z.TypeOf<typeof RegisterBodyType>;
export const RegisterRes = z.object({
  data: z.null(),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type RegisterResType = z.TypeOf<typeof RegisterRes>;

//////////////////////////////////////////////////////////////////////////
// get list store

export const ListStoreRes = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      createAt: z.string(),
      updateAt: z.string(),
    })
  ),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListStoreResType = z.TypeOf<typeof ListStoreRes>;

// get  store
export const storeRes = z.object({
  data: z.object({
    _id: z.string(),
    name: z.string(),
    createAt: z.string(),
    updateAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type storeResType = z.TypeOf<typeof storeRes>;
// create store

export const createStoreBody = z.object({
  name: z.string(),
});
export type createStoreBodyType = z.TypeOf<typeof createStoreBody>;

export const createStoreRes = z.object({
  data: z.object({
    _id: z.string(),
    name: z.string(),
    createAt: z.string(),
    updateAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type createStoreResType = z.TypeOf<typeof createStoreRes>;
//update
export const updateStoreBody = z.object({
  storeId: z.string(),
  name: z.string(),
});
export type updateStoreBodyType = z.TypeOf<typeof updateStoreBody>;

export const deleteStoreBody = z.object({
  storeId: z.string(),
});
export type deleteStoreBodyType = z.TypeOf<typeof deleteStoreBody>;

/////////////////////////////////////////
// create billboard
export const createBillboardBody = z.object({
  label: z.string(),
  image: z.string(),
  storeId: z.string(),
});
export type createBillboardBodyType = z.TypeOf<typeof createBillboardBody>;

export const createBillboardRes = z.object({
  data: z.object({
    _id: z.string(),
    label: z.string(),
    image: z.string(),
    storeId: z.string(),
    createAt: z.string(),
    updateAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type createBillboardResType = z.TypeOf<typeof createBillboardRes>;

/// get bill board
export const BillboardRes = z.object({
  data: z.object({
    _id: z.string(),
    label: z.string(),
    image: z.string(),
    storeId: z.string(),
    categoryId: z.string(),
    createAt: z.string(),
    updateAt: z.string(),
  }),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type BillboardResType = z.TypeOf<typeof BillboardRes>;

/// update bill board
export const updateBillboardBody = z.object({
  storeId: z.string(),
  _id: z.string(),
  label: z.string(),
  image: z.string(),
});
export type updateBillboardBodyType = z.TypeOf<typeof updateBillboardBody>;

// get list store
export const ListBillboardRes = z.object({
  data: z.array(
    z.object({
      _id: z.string(),
      label: z.string(),
      image: z.string(),
      storeId: z.string(),
      categoryId: z.string(),
      createAt: z.string(),
      updateAt: z.string(),
    })
  ),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ListBillboardResType = z.TypeOf<typeof ListBillboardRes>;
export const deleteBillboardBody = z.object({
  storeId: z.string(),
  billboardId: z.string(),
});
export type deleteBillboardBodyType = z.TypeOf<typeof deleteBillboardBody>;
