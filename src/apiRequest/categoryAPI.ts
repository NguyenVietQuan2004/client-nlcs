import httpRequest from "@/lib/http";
import {
  CategoryResType,
  CategoryBodyType,
  ListCategoryResType,
  ListCategoryBodyType,
  CreateCategoryResType,
  UpdateCategoryResType,
  DeleteCategoryResType,
  CreateCategoryBodyType,
  DeleteCategoryBodyType,
  UpdateCategoryBodyType,
} from "@/Type/CategoryTypes";

export const categoryAPI = {
  getCategory(body: CategoryBodyType) {
    return httpRequest.get<CategoryResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/category?_id=${body._id}&storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },

  getListCategory(body: ListCategoryBodyType) {
    return httpRequest.get<ListCategoryResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/category/getall?storeId=${body.storeId}`,
      {
        headers: {
          Cookie: `sessionToken=${body.sessionToken}`,
        },
      }
    );
  },

  createCategory(body: CreateCategoryBodyType) {
    return httpRequest.post<CreateCategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
      body,
      credentials: "include",
    });
  },

  updateCategory(body: UpdateCategoryBodyType) {
    return httpRequest.put<UpdateCategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
      body,
      credentials: "include",
    });
  },

  deleteBillboard(body: DeleteCategoryBodyType) {
    return httpRequest.delete<DeleteCategoryResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/category`, {
      body: body,
      credentials: "include",
    });
  },
};
