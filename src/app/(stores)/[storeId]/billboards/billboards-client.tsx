"use client";
import { PlusIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { ListBillboardResType } from "@/app/Type/AuthTypes";
import { Button, buttonVariants } from "@/components/ui/button";

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
      {listBillboard?.map((item) => {
        return (
          <div key={item._id}>
            {item.label} {item._id}
          </div>
        );
      })}
    </div>
  );
}

export default BillboardsClient;
