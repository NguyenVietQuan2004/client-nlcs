"use client";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button, buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { ProductColumns } from "@/app/(stores)/[storeId]/products/[productId]/_table_product/product-columns";
import { ListProductResType } from "@/Type/ProductType";

interface ProductsClientProps {
  listObjectProduct: ListProductResType | null;
}

function ProductsClient({ listObjectProduct }: ProductsClientProps) {
  const listProduct = listObjectProduct?.data;
  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Products( ${listProduct?.length})`} description="Manage products for your store" />
        <Button
          className={buttonVariants({
            className: "ml-auto",
          })}
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Add item
        </Button>
      </div>
      {listProduct && (
        <div className="container mx-auto py-10">
          <DataTable columns={ProductColumns} data={listProduct} filterBy="name" />
        </div>
      )}
    </div>
  );
}

export default ProductsClient;
