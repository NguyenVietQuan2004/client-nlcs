import { cookies } from "next/headers";

import { ColorResType } from "@/Type/ColorType";
import { ColorAPI } from "@/apiRequest/colorAPI";
import { handlError } from "@/components/handle-error";
import ColorForm from "@/app/(stores)/[storeId]/colors/[colorId]/color-id-form";

interface ColorIdProps {
  params: { storeId: string; colorId: string };
}
async function getColor(storeId: string, colorId: string) {
  let color: ColorResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")!.value || "";
  try {
    color = await ColorAPI.getColor({
      _id: colorId,
      sessionToken,
      storeId,
    });
  } catch (error: any) {
    if (error.statusCode !== 400) {
      handlError({ consoleError: "GET_COLOR_ERROR", error });
    }
  }
  return color;
}

export default async function ColorId({ params }: ColorIdProps) {
  const color = await getColor(params.storeId, params.colorId);
  return (
    <div>
      <ColorForm initObjectData={color} />
    </div>
  );
}
