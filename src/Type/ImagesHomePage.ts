//////////////////////////////-----ImagesHomePage TYPE-----//////////////////////////////

import z from "zod";

export const ImagesHomePage = z.object({
  _id: z.string(),
  billboardBST: z.string(),
  backgroundInsurance: z.string(),
  billboardFeature: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

//  ImagesHomePage BODY TYPE
export const ImagesHomePageBody = z.object({
  storeId: z.string(),
});
export type ImagesHomePageBodyType = z.TypeOf<typeof ImagesHomePageBody>;

//  ImagesHomePage RES TYPE
export const ImagesHomePageRes = z.object({
  data: ImagesHomePage,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type ImagesHomePageResType = z.TypeOf<typeof ImagesHomePageRes>;

// CREATE ImagesHomePage BODY TYPE
export const CreateImagesHomePageBody = z.object({
  storeId: z.string(),
  billboardBST: z.string(),
  billboardFeature: z.array(z.string()),
  backgroundInsurance: z.string(),
});
export type CreateImagesHomePageBodyType = z.TypeOf<typeof CreateImagesHomePageBody>;

// CREATE ImagesHomePage RES TYPE
export const CreateImagesHomePageRes = z.object({
  data: ImagesHomePage,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type CreateImagesHomePageResType = z.TypeOf<typeof CreateImagesHomePageRes>;

// UPDATE ImagesHomePage RES TYPE
export const UpdateImagesHomePageBody = z.object({
  storeId: z.string(),
  billboardBST: z.string(),
  billboardFeature: z.array(z.string()),
  backgroundInsurance: z.string(),
});
export type UpdateImagesHomePageBodyType = z.TypeOf<typeof UpdateImagesHomePageBody>;

// UPDATE ImagesHomePage RES TYPE
export const UpdateImagesHomePageRes = z.object({
  data: ImagesHomePage,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type UpdateImagesHomePageResType = z.TypeOf<typeof UpdateImagesHomePageRes>;

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
