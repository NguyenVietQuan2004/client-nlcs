import httpRequest from "@/lib/http";
import {
  CreateImagesHomePageBodyType,
  CreateImagesHomePageResType,
  ImagesHomePageBodyType,
  ImagesHomePageResType,
  UpdateImagesHomePageBodyType,
  UpdateImagesHomePageResType,
} from "@/Type/ImagesHomePage";

export const ImagesHomePageAPI = {
  getImagesHomePage(body: ImagesHomePageBodyType) {
    return httpRequest.get<ImagesHomePageResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/informationhomepage?storeId=${body.storeId}`,
      {
        cache: "no-cache",
      }
    );
  },
  createImagesHomePage(body: CreateImagesHomePageBodyType) {
    return httpRequest.post<CreateImagesHomePageResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/informationhomepage`,
      {
        body,
        credentials: "include",
      }
    );
  },
  updateImagesHomePage(body: UpdateImagesHomePageBodyType) {
    return httpRequest.put<UpdateImagesHomePageResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/informationhomepage`, {
      body,
      credentials: "include",
    });
  },
};
