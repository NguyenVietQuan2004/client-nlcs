import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import UserAvatar from "@/components/user-avatar";
import { ListStoreResType } from "@/Type/StoreTypes";
import { handlError } from "@/components/handle-error";
import Drawer from "@/app/(stores)/[storeId]/_navbar/drawer";
import ListRoute from "@/app/(stores)/[storeId]/_navbar/List-route";
import DropDownStore from "@/app/(stores)/[storeId]/_navbar/drop-down";

async function MainNavbar() {
  let stores: ListStoreResType | null = null;
  try {
    const sessionToken = cookies().get("sessionToken")?.value || "";
    stores = await storeAPI.getListStore({ sessionToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_STORE", error });
  }
  if (stores?.data.length === 0 || !stores) {
    redirect("/");
    // return <div>no store loading redirect main page...</div>;
  }
  return (
    <div className="p-4 border-b  items-center flex justify-between">
      <Drawer />
      <div className="lg:mr-8">
        <DropDownStore listStore={stores} />
      </div>
      <div className="items-center  justify-between hidden lg:flex">
        <ListRoute />
      </div>
      <div className="ml-0 lg:ml-auto">
        <UserAvatar />
      </div>
    </div>
  );
}

export default MainNavbar;
