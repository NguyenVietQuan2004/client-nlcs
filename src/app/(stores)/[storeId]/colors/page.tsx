import { cookies } from "next/headers";

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
    const sessionToken = cookies().get("sessionToken")?.value || "";
    colors = await ColorAPI.getListColor({ storeId, sessionToken });
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

// interface ColorsProps {
//   params: { storeId: string };
// }

// export default async function Colors({ params }: ColorsProps) {
//   let colors: ListColorResType | null = null;
//   console.log("da duoc goi lai");
//   try {
//     const sessionToken = cookies().get("sessionToken")?.value || "";
//     colors = await ColorAPI.getListColor({ storeId: params.storeId, sessionToken });
//   } catch (error) {
//     handlError({ consoleError: "GET_ALL_COLOR", error });
//   }
//   return (
//     <div>
//       <ColorsClient listObjectColor={colors} />
//     </div>
//   );
// }
