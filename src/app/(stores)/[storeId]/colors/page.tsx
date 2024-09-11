import { ColorAPI } from "@/apiRequest/colorAPI";
import { ListColorResType } from "@/Type/ColorType";
import { handlError } from "@/components/handle-error";
import ColorsClient from "@/app/(stores)/[storeId]/colors/colors-client";

interface ColorsProps {
  params: { storeId: string };
}

async function getColors(storeId: string) {
  let colors: ListColorResType | null = null;

  try {
    colors = await ColorAPI.getListColor({ storeId });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_COLOR", error });
  }
  return colors;
}

export default async function Colors({ params }: ColorsProps) {
  const colors = await getColors(params.storeId);
  return (
    <div>
      <ColorsClient listObjectColor={colors} />
    </div>
  );
}
