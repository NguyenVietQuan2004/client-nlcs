import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { StoreResType } from "@/Type/StoreTypes";
import SettingForm from "@/app/(stores)/[storeId]/settings/setting-form";
import { handlError } from "@/components/handle-error";

interface SettingsProps {
  params: { storeId: string };
}
async function getStore(storeId: string) {
  let store: StoreResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")?.value || "";

  try {
    store = await storeAPI.getStore({ _id: storeId, sessionToken });
  } catch (error) {
    handlError({ consoleError: "GET_STORE_ERROR", error });
  }
  if (!store?.data) {
    redirect("/");
  } else {
    return store;
  }
}

export default async function Settings({ params }: SettingsProps) {
  let store: StoreResType;
  store = await getStore(params.storeId);
  return (
    <div>
      <SettingForm initData={store} />
    </div>
  );
}
