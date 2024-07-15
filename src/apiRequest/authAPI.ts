import { LoginBodyFirebaseType, LoginBodyType, RegisterBodyType } from "@/app/Type/AuthTypes";
import httpRequest from "@/lib/http";

export const authApi = {
  loginFirebase(body: LoginBodyFirebaseType) {
    return httpRequest.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/loginwithfirebase`, {
      body,
      credentials: "include",
    });
  },
  register(body: RegisterBodyType) {
    return httpRequest.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      body,
    });
  },
  login(body: LoginBodyType) {
    return httpRequest.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      body,
      credentials: "include",
    });
  },
};
