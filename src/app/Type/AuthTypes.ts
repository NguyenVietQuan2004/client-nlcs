import z from "zod";

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

export const RegisterRes = z.object({
  data: z.null(),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type RegisterResType = z.TypeOf<typeof RegisterRes>;
