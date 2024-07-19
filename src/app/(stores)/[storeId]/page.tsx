import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { storeResType } from "@/app/Type/AuthTypes";

interface StoreProps {
  params: { storeId: string };
}

async function Store({ params }: StoreProps) {
  let store: storeResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")?.value || "";
  try {
    store = await storeAPI.getStore(params.storeId, sessionToken);
  } catch (error) {
    console.error("GET_STORE_ERROR", error);
  } finally {
    if (!store?.data) {
      redirect("/");
    }
  }
  return <div>this is {store.data.name}`</div>;
}

export default Store;
