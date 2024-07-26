import httpRequest from "@/lib/http";
import {
  BillboardResType,
  BillboardBodyType,
  ListBillboardResType,
  ListBillboardBodyType,
  CreateBillboardResType,
  UpdateBillboardResType,
  DeleteBillboardResType,
  DeleteBillboardBodyType,
  CreateBillboardBodyType,
  UpdateBillboardBodyType,
} from "@/Type/BillboardTypes";

export const billboardAPI = {
  getBillboard(body: BillboardBodyType) {
    return httpRequest.get<BillboardResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard?_id=${body._id}&storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },

  getListBillboard(body: ListBillboardBodyType) {
    return httpRequest.get<ListBillboardResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard/getall?storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },

  createBillboard(body: CreateBillboardBodyType) {
    return httpRequest.post<CreateBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body,
      credentials: "include",
    });
  },

  updateBillboard(body: UpdateBillboardBodyType) {
    return httpRequest.put<UpdateBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body,
      credentials: "include",
    });
  },

  deleteBillboard(body: DeleteBillboardBodyType) {
    return httpRequest.delete<DeleteBillboardResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/billboard`, {
      body: body,
      credentials: "include",
    });
  },
};
