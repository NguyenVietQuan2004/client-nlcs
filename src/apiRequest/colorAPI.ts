import httpRequest from "@/lib/http";
import {
  ColorResType,
  ColorBodyType,
  ListColorResType,
  ListColorBodyType,
  CreateColorResType,
  UpdateColorResType,
  DeleteColorResType,
  UpdateColorBodyType,
  DeleteColorBodyType,
  CreateColorBodyType,
} from "@/Type/ColorType";

export const ColorAPI = {
  getColor(body: ColorBodyType) {
    return httpRequest.get<ColorResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/color?_id=${body._id}&storeId=${body.storeId}`,
      {
        cache: "no-cache",
      }
    );
  },

  getListColor(body: ListColorBodyType) {
    return httpRequest.get<ListColorResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/color/getall?storeId=${body.storeId}`,
      {
        cache: "no-cache",
      }
    );
  },

  createColor(body: CreateColorBodyType) {
    return httpRequest.post<CreateColorResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/color`, {
      body,
      credentials: "include",
    });
  },

  updateColor(body: UpdateColorBodyType) {
    return httpRequest.put<UpdateColorResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/color`, {
      body,
      credentials: "include",
    });
  },

  deleteColor(body: DeleteColorBodyType) {
    return httpRequest.delete<DeleteColorResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/color`, {
      body: body,
      credentials: "include",
    });
  },
};
