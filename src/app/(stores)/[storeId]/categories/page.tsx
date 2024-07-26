import { cookies } from "next/headers";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import { categoryAPI } from "@/apiRequest/categoryAPI";
import CategoriesClient from "@/app/(stores)/[storeId]/categories/categories-client";
import { handlError } from "@/components/handle-error";

interface CategoriesProps {
  params: { storeId: string };
}
async function getCategories(storeId: string) {
  let categories: ListCategoryResType | null = null;
  try {
    const sessionToken = cookies().get("sessionToken")?.value || "";
    categories = await categoryAPI.getListCategory({ storeId, sessionToken });
    console.log(categories);
  } catch (error) {
    handlError({
      consoleError: "GET_ALL_CATEGORY_ERROR",
      error,
    });
  }
  return categories;
}

export default async function Categories({ params }: CategoriesProps) {
  const categories = await getCategories(params.storeId);
  return (
    <div>
      <CategoriesClient listObjectCategory={categories} />
    </div>
  );
}
