import { cookies } from "next/headers";
import BillboardsClient from "./billboards-client";
import { ListBillboardResType } from "@/app/Type/AuthTypes";
import { billboardAPI } from "@/apiRequest/billboardAPI";

interface BillboardProps {
  params: { storeId: string };
}

async function Billboards({ params }: BillboardProps) {
  let bilboards: ListBillboardResType | null = null;
  try {
    const sessionToken = cookies().get("sessionToken")?.value;
    bilboards = await billboardAPI.getListBillboard(params.storeId, sessionToken || "");
  } catch (error: any) {
    console.error("GET_ALL_BILLBOARD", error);
  }

  return (
    <div>
      <BillboardsClient listObjectBillboard={bilboards} />
    </div>
  );
}

export default Billboards;
