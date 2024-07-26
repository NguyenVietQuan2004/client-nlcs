//////////////////////////////-----AUTH TYPE-----//////////////////////////////

import z from "zod";

// LOGIN BODY TYPE
const LoginBody = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

// LOGIN RES TYPE
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

// LOGIN FIREBASE BODY TYPE
const LoginFirebaseBody = z.object({
  id: z.string(),
  userName: z.string(),
  accessToken: z.string(),
});
export type LoginFirebaseBodyType = z.TypeOf<typeof LoginFirebaseBody>;

// LOGIN RES TYPE
const LoginFirebaseRes = z.object({
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
export type LoginFirebaseResType = z.TypeOf<typeof LoginFirebaseRes>;

// REGISTER  BODY TYPE
const RegisterBodyType = z.object({
  email: z.string(),
  userName: z.string(),
  password: z.string(),
});
export type RegisterBodyType = z.TypeOf<typeof RegisterBodyType>;

// REGISTER  RES TYPE
export const RegisterRes = z.object({
  data: z.null(),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type RegisterResType = z.TypeOf<typeof RegisterRes>;

// SEND COOKIE TO SERVER BODY TYPE
export const SendCookieToServerBody = z.object({
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
export type SendCookieToServerBodyType = z.TypeOf<typeof SendCookieToServerBody>;

// SEND COOKIE TO SERVER RES TYPE
export const SendCookieToServerRes = z.object({
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
export type SendCookieToServerResType = z.TypeOf<typeof SendCookieToServerRes>;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
