import httpRequest from "@/lib/http";

import {
  ProductResType,
  ProductBodyType,
  ListProductResType,
  ListProductBodyType,
  UpdateProductResType,
  DeleteProductResType,
  CreateProductResType,
  DeleteProductBodyType,
  UpdateProductBodyType,
  CreateProductBodyType,
} from "@/Type/ProductType";

export const productAPI = {
  getProduct(body: ProductBodyType) {
    return httpRequest.get<ProductResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product?_id=${body._id}&storeId=${body.storeId}`,
      {
        cache: "no-cache",
      }
    );
  },

  getListProduct(body: ListProductBodyType) {
    return httpRequest.get<ListProductResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/product/getall?storeId=${body.storeId}`,
      {
        cache: "no-cache",
      }
    );
  },

  createProduct(body: CreateProductBodyType) {
    return httpRequest.post<CreateProductResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product`, {
      body,
      credentials: "include",
    });
  },

  updateProduct(body: UpdateProductBodyType) {
    return httpRequest.put<UpdateProductResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product`, {
      body,
      credentials: "include",
    });
  },

  deleteProduct(body: DeleteProductBodyType) {
    return httpRequest.delete<DeleteProductResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/product`, {
      body: body,
      credentials: "include",
    });
  },
};
