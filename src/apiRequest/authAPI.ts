import {
  LoginResType,
  LoginBodyType,
  RegisterResType,
  RegisterBodyType,
  LoginFirebaseResType,
  LoginFirebaseBodyType,
  SendCookieToServerResType,
  SendCookieToServerBodyType,
} from "@/Type/AuthTypes";
import httpRequest from "@/lib/http";

export const authApi = {
  login(body: LoginBodyType) {
    return httpRequest.post<LoginResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      body,
      credentials: "include",
    });
  },

  loginFirebase(body: LoginFirebaseBodyType) {
    return httpRequest.post<LoginFirebaseResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/loginwithfirebase`, {
      body,
      credentials: "include",
    });
  },

  register(body: RegisterBodyType) {
    return httpRequest.post<RegisterResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
      body,
    });
  },

  sendCookieToServer(body: SendCookieToServerBodyType) {
    return httpRequest.post<SendCookieToServerResType>(`/api/auth/login`, {
      body,
      credentials: "include",
    });
  },

  signOut() {
    return httpRequest.post<any>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/signout`, {
      credentials: "include",
    });
  },
  signOutNextServer() {
    return httpRequest.post<any>(`/api/auth/signout`, {
      credentials: "include",
    });
  },
};
