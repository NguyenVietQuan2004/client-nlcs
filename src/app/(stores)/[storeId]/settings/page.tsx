import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { storeResType } from "@/app/Type/AuthTypes";
import SettingForm from "@/app/(stores)/[storeId]/settings/setting-form";

interface SettingsProps {
  params: { storeId: string };
}
async function Settings({ params }: SettingsProps) {
  let store: storeResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")?.value || "";
  try {
    store = await storeAPI.getStore(params.storeId, sessionToken);
  } catch (error) {
    console.error("", error);
  }
  if (!store?.data || !store) {
    redirect("/");
  }
  return (
    <div>
      <SettingForm initData={store} />
    </div>
  );
}

export default Settings;
