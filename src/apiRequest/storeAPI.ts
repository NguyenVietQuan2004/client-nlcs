import httpRequest from "@/lib/http";
import {
  StoreResType,
  StoreBodyType,
  ListStoreResType,
  LitStoreBodyType,
  CreateStoreResType,
  UpdateStoreResType,
  DeleteStoreResType,
  CreateStoreBodyType,
  UpdateStoreBodyType,
  DeleteStoreBodyType,
} from "@/Type/StoreTypes";

export const storeAPI = {
  getStore(body: StoreBodyType) {
    return httpRequest.get<StoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store?_id=${body._id}`, {
      headers: {
        Cookie: `sessionToken=${body.sessionToken}`,
      },
    });
  },

  getListStore(body: LitStoreBodyType) {
    return httpRequest.get<ListStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store/getall`, {
      headers: {
        Cookie: `sessionToken=${body.sessionToken}`,
      },
    });
  },

  createStore(body: CreateStoreBodyType) {
    return httpRequest.post<CreateStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body,
      credentials: "include",
    });
  },

  updateStore(body: UpdateStoreBodyType) {
    return httpRequest.put<UpdateStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body: body,
      credentials: "include",
    });
  },
  deleteStore(body: DeleteStoreBodyType) {
    return httpRequest.delete<DeleteStoreResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/store`, {
      body: body,
      credentials: "include",
    });
  },
};
