import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { storeAPI } from "@/apiRequest/storeAPI";
import { StoreResType } from "@/Type/StoreTypes";
import { orderAPI } from "@/apiRequest/orderAPI";
import { handlError } from "@/components/handle-error";
import DashboardClient from "@/app/(stores)/[storeId]/(root)/dashboard-client";
import { OverviewBodyType, OverviewResType } from "@/Type/OrderTypes";
import { boolean } from "zod";
import { Suspense } from "react";
import Loading from "./loading";

interface StoreProps {
  params: { storeId: string };
}
async function getStore(storeId: string) {
  let store: StoreResType | null = null;
  let dataOverview: OverviewResType | null = null;
  const cookie = cookies();
  const sessionToken = cookie.get("sessionToken")?.value || "";
  try {
    store = await storeAPI.getStore({ _id: storeId, sessionToken });
    dataOverview = await orderAPI.getOverview({ storeId, sessionToken });
  } catch (error) {
    handlError({
      consoleError: "GET_STORE_ERROR",
      error,
    });
  }
  if (!store?.data || !dataOverview) {
    redirect("/");
  } else {
    return dataOverview;
  }
}

export default async function Store({ params }: StoreProps) {
  const dataOverview = await getStore(params.storeId);
  return (
    <div>
      <DashboardClient dataOverview={dataOverview.data} />
    </div>
  );
}
