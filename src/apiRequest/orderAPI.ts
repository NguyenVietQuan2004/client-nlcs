import httpRequest from "@/lib/http";
import {
  ListOrderResType,
  ListOrderBodyType,
  CreateOrderResType,
  DeleteOrderResType,
  CreateOrderBodyType,
  DeleteOrderBodyType,
} from "@/Type/OrderTypes";

export const orderAPI = {
  getListOrder(body: ListOrderBodyType) {
    return httpRequest.get<ListOrderResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/order/getall?storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },

  createColor(body: CreateOrderBodyType) {
    return httpRequest.post<CreateOrderResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`, {
      body,
      credentials: "include",
    });
  },

  deleteOrder(body: DeleteOrderBodyType) {
    return httpRequest.delete<DeleteOrderResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order`, {
      body: body,
      credentials: "include",
    });
  },
};
