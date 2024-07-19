import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { ListStoreResType } from "@/app/Type/AuthTypes";
import ModalCreateStore from "@/components/modal-create-store";

export default async function Home() {
  let stores: ListStoreResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")?.value || "";

  try {
    stores = await storeAPI.getListStore(sessionToken);
  } catch (error: any) {
    console.error("GET_ALL_STORE", error);
  } finally {
    if (stores && stores?.data?.length > 0) {
      redirect(`/${stores.data[0]._id}`);
    }
  }
  return <div>{stores?.data?.length === 0 && <ModalCreateStore autoShow={true} />}</div>;
}
