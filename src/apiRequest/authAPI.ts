import {
  LoginResType,
  LoginBodyType,
  RegisterResType,
  RegisterBodyType,
  LoginBodyFirebaseType,
} from "@/app/Type/AuthTypes";
import httpRequest from "@/lib/http";

export const authApi = {
  login(body: LoginBodyType) {
    return httpRequest.post<LoginResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      body,
      credentials: "include",
    });
  },
  loginFirebase(body: LoginBodyFirebaseType) {
    return httpRequest.post<LoginResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/loginwithfirebase`, {
      body,
      credentials: "include",
    });
  },
  register(body: RegisterBodyType) {
    return httpRequest.post<RegisterResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      body,
    });
  },
  sendCookieToServer(body: LoginResType) {
    return httpRequest.post<LoginResType>(`/api/auth/login`, {
      body,
      credentials: "include",
    });
  },
};
