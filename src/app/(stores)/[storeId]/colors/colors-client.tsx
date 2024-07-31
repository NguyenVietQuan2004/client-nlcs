"use client";

import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import ApiList from "@/components/api-list";
import { ListColorResType } from "@/Type/ColorType";
import { DataTable } from "@/components/data-table/data-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { ColorColumns } from "@/app/(stores)/[storeId]/colors/[colorId]/_table_color/color-columns";

interface ColorsClientProps {
  listObjectColor: ListColorResType | null;
}

function ColorsClient({ listObjectColor }: ColorsClientProps) {
  const listColor = listObjectColor?.data;
  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Colors( ${listColor?.length})`} description="Manage colors for your store" />
        <Button
          className={buttonVariants({
            className: "ml-auto",
          })}
          onClick={() => router.push(`/${params.storeId}/colors/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Add item
        </Button>
      </div>
      {listColor && (
        <div className="lg:container mx-auto py-10">
          <DataTable columns={ColorColumns} data={listColor} filterBy="name" />
        </div>
      )}
      <div className="border-b pb-4 border-[rgb(228, 228, 231)]">
        <Heading title={`API`} description="API call for categories" />
      </div>
      <ApiList entityName="colors" entityIdName="colorId" />
    </div>
  );
}

export default ColorsClient;
