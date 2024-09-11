import { handlError } from "@/components/handle-error";
import { billboardAPI } from "@/apiRequest/billboardAPI";
import { BillboardResType } from "@/Type/BillboardTypes";
import BillboardForm from "@/app/(stores)/[storeId]/billboards/[billboardId]/billboard-id-form";

interface BillboardIdProps {
  params: { storeId: string; billboardId: string };
}
async function getBillboard(storeId: string, billboardId: string) {
  let billboard: BillboardResType | null = null;
  try {
    billboard = await billboardAPI.getBillboard({
      _id: billboardId,
      storeId,
    });
  } catch (error: any) {
    if (error.statusCode !== 400) {
      handlError({ consoleError: "GET_BILLBOSRD_ERROR", error });
    }
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
