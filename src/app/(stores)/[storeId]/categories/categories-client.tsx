"use client";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { DataTable } from "@/components/data-table/data-table";
import { ListCategoryResType } from "@/Type/CategoryTypes";
import { Button, buttonVariants } from "@/components/ui/button";
import { CategoryColumns } from "@/app/(stores)/[storeId]/categories/[categoryId]/_table_category/category-columns";

interface CategoriesClientProps {
  listObjectCategory: ListCategoryResType | null;
}

function CategoriesClient({ listObjectCategory }: CategoriesClientProps) {
  const listCategory = listObjectCategory?.data;

  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Categories( ${listCategory?.length})`} description="Manage Category for your store" />
        <Button
          className={buttonVariants({
            className: "ml-auto",
          })}
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Add item
        </Button>
      </div>
      {listCategory && (
        <div className="container mx-auto py-10">
          <DataTable columns={CategoryColumns} data={listCategory} filterBy="name" />
        </div>
      )}
    </div>
  );
}

export default CategoriesClient;
