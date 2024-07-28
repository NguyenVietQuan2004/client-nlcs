"use client";

import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { ListSizeResType } from "@/Type/SizeTypes";
import { DataTable } from "@/components/data-table/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { SizeColumns } from "@/app/(stores)/[storeId]/sizes/[sizeId]/_table_size/size-columns";
import ApiList from "@/components/api-list";

interface SizesClientProps {
  listObjectSize: ListSizeResType | null;
}

function SizesClient({ listObjectSize }: SizesClientProps) {
  const listSize = listObjectSize?.data;
  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Sizes( ${listSize?.length})`} description="Manage size for your store" />
        <Button
          className={buttonVariants({
            className: "ml-auto",
          })}
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Add item
        </Button>
      </div>
      {listSize && (
        <div className="container mx-auto py-10">
          <DataTable columns={SizeColumns} data={listSize} filterBy="name" />
        </div>
      )}
      <div className="border-b pb-4 border-[rgb(228, 228, 231)]">
        <Heading title={`API`} description="API call for categories" />
      </div>
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  );
}

export default SizesClient;
