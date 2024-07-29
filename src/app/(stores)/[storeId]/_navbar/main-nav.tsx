import { cookies } from "next/headers";

import { storeAPI } from "@/apiRequest/storeAPI";
import UserAvatar from "@/components/user-avatar";
import { ListStoreResType } from "@/Type/StoreTypes";
import { handlError } from "@/components/handle-error";
import ListRoute from "@/app/(stores)/[storeId]/_navbar/List-route";
import DropDownStore from "@/app/(stores)/[storeId]/_navbar/drop-down";
import { Button, buttonVariants } from "@/components/ui/button";

async function MainNavbar() {
  let stores: ListStoreResType | null = null;
  try {
    const sessionToken = cookies().get("sessionToken")?.value || "";
    stores = await storeAPI.getListStore({ sessionToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_STORE", error });
  }
  if (stores?.data.length === 0 || !stores) {
    return <div>no store loading redirect main page...</div>;
    // redirect("/");
  }
  return (
    <div className="relative p-4 border-b flex items-center">
      <div className="mr-8">
        <DropDownStore listStore={stores} />
      </div>
      <ListRoute />
      <div className="ml-auto">
        <UserAvatar />
      </div>
      <div className="absolute top-[70%] right-6  bg-zinc-100 shadow-lg ">
        <Button
          className={buttonVariants({
            variant: "outline",
            className: "text-black",
          })}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}

export default MainNavbar;
