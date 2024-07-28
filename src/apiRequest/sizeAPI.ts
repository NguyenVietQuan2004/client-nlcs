import httpRequest from "@/lib/http";
import {
  SizeResType,
  SizeBodyType,
  ListSizeResType,
  ListSizeBodyType,
  DeleteSizeResType,
  CreateSizeResType,
  UpdateSizeResType,
  DeleteSizeBodyType,
  UpdateSizeBodyType,
  CreateSizeBodyType,
} from "@/Type/SizeTypes";

export const sizeAPI = {
  getSize(body: SizeBodyType) {
    return httpRequest.get<SizeResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/size?_id=${body._id}&storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },
  getListSize(body: ListSizeBodyType) {
    return httpRequest.get<ListSizeResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/size/getall?storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },
  createSize(body: CreateSizeBodyType) {
    return httpRequest.post<CreateSizeResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/size`, {
      body,
      credentials: "include",
    });
  },
  updateSize(body: UpdateSizeBodyType) {
    return httpRequest.put<UpdateSizeResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/size`, {
      body,
      credentials: "include",
    });
  },
  deleteSize(body: DeleteSizeBodyType) {
    return httpRequest.delete<DeleteSizeResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/size`, {
      body: body,
      credentials: "include",
    });
  },
};
