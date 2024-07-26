import { cookies } from "next/headers";

import { productAPI } from "@/apiRequest/productAPI";
import { handlError } from "@/components/handle-error";
import { ListProductResType } from "@/Type/ProductType";
import ProductsClient from "@/app/(stores)/[storeId]/products/products-client";

interface ProductsProps {
  params: { storeId: string };
}

async function getProducts(storeId: string) {
  let products: ListProductResType | null = null;

  try {
    const sessionToken = cookies().get("sessionToken")?.value || "";
    products = await productAPI.getListProduct({ storeId, sessionToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_PRODUCT", error });
  }
  return products;
}

export default async function Products({ params }: ProductsProps) {
  const products = await getProducts(params.storeId);
  return (
    <div>
      <ProductsClient listObjectProduct={products} />
    </div>
  );
}
