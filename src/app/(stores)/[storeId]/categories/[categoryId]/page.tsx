import { cookies } from "next/headers";

import { categoryAPI } from "@/apiRequest/categoryAPI";
import { CategoryResType } from "@/Type/CategoryTypes";
import { handlError } from "@/components/handle-error";
import CategoryForm from "@/app/(stores)/[storeId]/categories/[categoryId]/category-id-form";

interface CategoryIdProps {
  params: { storeId: string; categoryId: string };
}

async function getCategory(storeId: string, categoryId: string) {
  let category: CategoryResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    category = await categoryAPI.getCategory({ _id: categoryId, sessionToken, storeId });
  } catch (error: any) {
    if (error.statusCode === 400) {
      category = error;
    } else {
      handlError({ consoleError: "GET_CATEGORY_ERROR", error });
    }
  }
  return category;
}

export default async function CategoryId({ params }: CategoryIdProps) {
  const category: CategoryResType | null = await getCategory(params.storeId, params.categoryId);
  return (
    <div>
      <CategoryForm initObjectData={category} />
    </div>
  );
}
