import { cookies } from "next/headers";

import { sizeAPI } from "@/apiRequest/sizeAPI";
import { SizeResType } from "@/Type/SizeTypes";
import { handlError } from "@/components/handle-error";
import SizeForm from "@/app/(stores)/[storeId]/sizes/[sizeId]/size-id-form";

interface SizeIdProps {
  params: { storeId: string; sizeId: string };
}
async function getSize(storeId: string, sizeId: string) {
  let size: SizeResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    size = await sizeAPI.getSize({
      _id: sizeId,
      sessionToken,
      storeId,
    });
  } catch (error) {
    handlError({ consoleError: "GET_SIZE_ERROR", error });
  }
  return size;
}

export default async function SizeId({ params }: SizeIdProps) {
  const size = await getSize(params.storeId, params.sizeId);
  return (
    <div>
      <SizeForm initObjectData={size} />
    </div>
  );
}
