import { cookies } from "next/headers";

import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { ProductResType } from "@/Type/ProductType";
import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import ProductForm from "@/app/(stores)/[storeId]/products/[productId]/product-id-form";

interface ProductIdProps {
  params: { storeId: string; productId: string };
}

async function getProduct(storeId: string, productId: string) {
  let product: ProductResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    product = await productAPI.getProduct({
      _id: productId,
      sessionToken,
      storeId,
    });
  } catch (error: any) {
    if (error.statusCode === 400) {
      product = error;
    } else {
      handlError({ consoleError: "GET_PRODUCT_ERROR", error });
    }
  }
  return product;
}

async function ProductId({ params }: ProductIdProps) {
  const product = await getProduct(params.storeId, params.productId);
  return (
    <div>
      <ProductForm initObjectData={product} />
    </div>
  );
}

export default ProductId;
