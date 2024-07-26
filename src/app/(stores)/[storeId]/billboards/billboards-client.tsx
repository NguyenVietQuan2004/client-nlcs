"use client";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import { Button, buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { BillboardColumns } from "@/app/(stores)/[storeId]/billboards/[billboardId]/_table_billboard/billboard-columns";

interface BillboardsClientProps {
  listObjectBillboard: ListBillboardResType | null;
}

function BillboardsClient({ listObjectBillboard }: BillboardsClientProps) {
  const listBillboard = listObjectBillboard?.data;
  const router = useRouter();
  const params = useParams();
  return (
    <div>
      <div className="flex items-center border-b pb-4">
        <Heading title={`Billboards( ${listBillboard?.length})`} description="Manage billboard for your store" />
        <Button
          className={buttonVariants({
            className: "ml-auto",
          })}
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <PlusIcon className="w-5 h-5" /> Add item
        </Button>
      </div>
      {listBillboard && (
        <div className="container mx-auto py-10">
          <DataTable columns={BillboardColumns} data={listBillboard} filterBy="label" />
        </div>
      )}
    </div>
  );
}

export default BillboardsClient;
