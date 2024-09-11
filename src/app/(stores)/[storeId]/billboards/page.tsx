import { handlError } from "@/components/handle-error";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { ListBillboardResType } from "@/Type/BillboardTypes";
import BillboardsClient from "@/app/(stores)/[storeId]/billboards/billboards-client";

interface BillboardsProps {
  params: { storeId: string };
}

async function getBillboards(storeId: string) {
  let billboards: ListBillboardResType | null = null;

  try {
    billboards = await billboardAPI.getListBillboard({ storeId });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_BILLBOARD", error });
  }
  return billboards;
}

export default async function Billboards({ params }: BillboardsProps) {
  const billboards = await getBillboards(params.storeId);
  return (
    <div>
      <BillboardsClient listObjectBillboard={billboards} />
    </div>
  );
}
