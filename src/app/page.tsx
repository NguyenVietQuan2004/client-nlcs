import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { ListStoreResType } from "@/Type/StoreTypes";
import { handlError } from "@/components/handle-error";
import ModalCreateStore from "@/components/modal-create-store";

export const dynamic = "force-dynamic";

async function getStores() {
  let stores: ListStoreResType | null = null;

  try {
    const cookie = cookies();
    const sessionToken = cookie.get("sessionToken")?.value || "";
    stores = await storeAPI.getListStore({ sessionToken });
  } catch (error) {
    handlError({
      consoleError: "GET_ALL_STORE_ERROR",
      error,
    });
  }
  if (stores && stores?.data.length > 0) {
    redirect(`/${stores.data[0]._id}`);
  } else {
    return true;
  }
}
export default async function Home() {
  let isNull = await getStores();
  return <div>{isNull && <ModalCreateStore autoShow={true} />}</div>;
}
