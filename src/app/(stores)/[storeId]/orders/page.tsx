import { cookies } from "next/headers";

import { orderAPI } from "@/apiRequest/orderAPI";
import { ListOrderResType } from "@/Type/OrderTypes";
import { handlError } from "@/components/handle-error";
import OrdersClient from "@/app/(stores)/[storeId]/orders/orders-client";

interface OrdersProps {
  params: { storeId: string };
}

async function getOrders(storeId: string) {
  let orders: ListOrderResType | null = null;

  try {
    const sessionToken = cookies().get("sessionToken")?.value || "";
    orders = await orderAPI.getListOrder({ storeId, sessionToken });
  } catch (error) {
    handlError({ consoleError: "GET_ALL_ORDER", error });
  }
  return orders;
}

export default async function Orders({ params }: OrdersProps) {
  const orders = await getOrders(params.storeId);
  return (
    <div>
      <OrdersClient listObjectOrder={orders} />
    </div>
  );
}
