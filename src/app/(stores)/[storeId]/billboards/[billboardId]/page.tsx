import Heading from "@/components/heading";
import BillboardForm from "./billboard-id-form";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { BillboardResType } from "@/app/Type/AuthTypes";

interface BillboardIdProps {
  params: { storeId: string; billboardId: string };
}

async function BillboardId({ params }: BillboardIdProps) {
  let billboard: BillboardResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    billboard = await billboardAPI.getBillboard(params.billboardId, sessionToken, params.storeId);
  } catch (error: any) {
    console.error("GET_BILLBOSRD_ERROR", error);
  }
  return (
    <div>
      <BillboardForm initObjectData={billboard} />
    </div>
  );
}

export default BillboardId;
