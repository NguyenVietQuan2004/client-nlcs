import httpRequest from "@/lib/http";
import {
  createStoreBodyType,
  ListStoreResType,
  createStoreResType,
  storeResType,
  updateStoreBodyType,
  deleteStoreBodyType,
} from "@/app/Type/AuthTypes";

export const storeAPI = {
  getListStore(sessionToken: string) {
    return httpRequest.get<ListStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store/getall`, {
      headers: {
        Cookie: `sessionToken=${sessionToken}`,
      },
    });
  },
  // gọi getStore ở server component thì phải tự truyền cookie
  getStore(storeId: string, sessionToken: string) {
    return httpRequest.get<storeResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store?id=${storeId}`, {
      headers: {
        Cookie: `sessionToken=${sessionToken}`,
      },
    });
  },
  createStore(body: createStoreBodyType) {
    return httpRequest.post<createStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body,
      credentials: "include",
    });
  },

  updateStore(body: updateStoreBodyType) {
    return httpRequest.put<storeResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body: body,
      credentials: "include",
    });
  },
  deleteStore(body: deleteStoreBodyType) {
    return httpRequest.delete<storeResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body: body,
      credentials: "include",
    });
  },
};
