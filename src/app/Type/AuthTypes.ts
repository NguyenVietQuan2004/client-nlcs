import z from "zod";

// login
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

const LoginBody = z.object({
  email: z.string(),
  password: z.string(),
});
export type LoginBodyType = z.TypeOf<typeof LoginBody>;

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
