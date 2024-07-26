import { cookies } from "next/headers";

import { billboardAPI } from "@/apiRequest/billboardAPI";
import { BillboardResType } from "@/Type/BillboardTypes";
import BillboardForm from "@/app/(stores)/[storeId]/billboards/[billboardId]/billboard-id-form";
import { handlError } from "@/components/handle-error";

interface BillboardIdProps {
  params: { storeId: string; billboardId: string };
}
async function getBillboard(storeId: string, billboardId: string) {
  let billboard: BillboardResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    billboard = await billboardAPI.getBillboard({
      _id: billboardId,
      sessionToken,
      storeId,
    });
  } catch (error) {
    handlError({ consoleError: "GET_BILLBOSRD_ERROR", error });
  }
  return billboard;
}

async function BillboardId({ params }: BillboardIdProps) {
  const billboard = await getBillboard(params.storeId, params.billboardId);
  return (
    <div>
      <BillboardForm initObjectData={billboard} />
    </div>
  );
}

export default BillboardId;
