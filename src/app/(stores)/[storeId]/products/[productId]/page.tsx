import { cookies } from "next/headers";

import { handlError } from "@/components/handle-error";
import { productAPI } from "@/apiRequest/productAPI";
import { ProductResType } from "@/Type/ProductType";
import ProductForm from "@/app/(stores)/[storeId]/products/[productId]/product-id-form";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import { categoryAPI } from "@/apiRequest/categoryAPI";
import { ListSizeResType } from "@/Type/SizeTypes";
import { ListColorResType } from "@/Type/ColorType";
import { sizeAPI } from "@/apiRequest/sizeAPI";
import { ColorAPI } from "@/apiRequest/colorAPI";

interface ProductIdProps {
  params: { storeId: string; productId: string };
}
interface InformationRevelantProductProps {
  product: ProductResType | null;
  categories: ListCategoryResType | null;
  sizes: ListSizeResType | null;
  colors: ListColorResType | null;
}
async function getInformationRevelantProduct(storeId: string, productId: string) {
  let informationRevelantProduct: InformationRevelantProductProps = {
    product: null,
    categories: null,
    sizes: null,
    colors: null,
  };
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    informationRevelantProduct.categories = await categoryAPI.getListCategory({ storeId, sessionToken });
    informationRevelantProduct.sizes = await sizeAPI.getListSize({ storeId, sessionToken });
    informationRevelantProduct.colors = await ColorAPI.getListColor({ storeId, sessionToken });
    informationRevelantProduct.product = await productAPI.getProduct({
      _id: productId,
      sessionToken,
      storeId,
    });
  } catch (error) {
    handlError({ consoleError: "GET_PRODUCT_ERROR", error });
  }
  return informationRevelantProduct;
}

async function ProductId({ params }: ProductIdProps) {
  const informationRevelantProduct = await getInformationRevelantProduct(params.storeId, params.productId);
  return (
    <div>
      <ProductForm
        initObjectData={informationRevelantProduct.product}
        listCategoryObject={informationRevelantProduct.categories}
        listSizeObject={informationRevelantProduct.sizes}
        listColorObject={informationRevelantProduct.colors}
      />
    </div>
  );
}

export default ProductId;
