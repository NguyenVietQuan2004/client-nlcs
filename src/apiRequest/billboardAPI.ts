import httpRequest from "@/lib/http";
import {
  BillboardResType,
  createBillboardBodyType,
  createBillboardResType,
  deleteBillboardBodyType,
  ListBillboardResType,
  updateBillboardBodyType,
} from "@/app/Type/AuthTypes";

export const billboardAPI = {
  createBillboard(body: createBillboardBodyType) {
    return httpRequest.post<createBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body,
      credentials: "include",
    });
  },
  updateBillboard(body: updateBillboardBodyType) {
    return httpRequest.put<createBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body,
      credentials: "include",
    });
  },
  getBillboard(billboardId: string, sessionToken: string, storeId: string) {
    return httpRequest.get<BillboardResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard?id=${billboardId}&storeId=${storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${sessionToken}`,
        },
      }
    );
  },
  getListBillboard(storeId: string, sessionToken: string) {
    return httpRequest.get<ListBillboardResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard/getall?storeId=${storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${sessionToken}`,
        },
      }
    );
  },
  deleteBillboard(body: deleteBillboardBodyType) {
    return httpRequest.delete<createBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body: body,
      credentials: "include",
    });
  },
};
