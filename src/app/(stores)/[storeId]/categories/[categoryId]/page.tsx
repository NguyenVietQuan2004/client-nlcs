import { cookies } from "next/headers";

import { categoryAPI } from "@/apiRequest/categoryAPI";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { CategoryResType } from "@/Type/CategoryTypes";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import CategoryForm from "@/app/(stores)/[storeId]/categories/[categoryId]/category-id-form";
import { handlError } from "@/components/handle-error";

interface CategoryIdProps {
  params: { storeId: string; categoryId: string };
}

interface getBillboardsAndCategoryProps {
  category: CategoryResType | null;
  listBillboard: ListBillboardResType | null;
}
async function getBillboardsAndCategory(storeId: string, categoryId: string) {
  let data: getBillboardsAndCategoryProps = { category: null, listBillboard: null };
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    data.listBillboard = await billboardAPI.getListBillboard({ storeId: storeId, sessionToken });
    data.category = await categoryAPI.getCategory({ _id: categoryId, sessionToken, storeId });
  } catch (error) {
    handlError({ consoleError: "GET_CATEGORY_ERROR", error });
  }
  return data;
}

export default async function CategoryId({ params }: CategoryIdProps) {
  const BillboardsAndCategory: getBillboardsAndCategoryProps = await getBillboardsAndCategory(
    params.storeId,
    params.categoryId
  );
  return (
    <div>
      <CategoryForm
        initObjectData={BillboardsAndCategory.category}
        listBillboardObject={BillboardsAndCategory.listBillboard}
      />
    </div>
  );
}
