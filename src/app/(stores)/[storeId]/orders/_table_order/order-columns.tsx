"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";
import CellPriceOrder from "@/app/(stores)/[storeId]/orders/_table_order/cell-price-order";
import OrderCellAction from "@/app/(stores)/[storeId]/orders/_table_order/cell-action-oder";

export const OrderColumns: ColumnDef<OrderType>[] = [
  {
    header: "Products",
    accessorKey: "listProductOrder",
    cell: ({ row }) => {
      const listProductOrder: any = row.getValue("listProductOrder");
      return listProductOrder.map((order: any) => {
        const sizeUserSelect = order.size;
        const product: ProductType = order._id[0];
        const colorsUserSelect = order.colors;

        return (
          <div key={order.size}>
            <div>
              <span className="font-semibold">Name:</span> {product?.name}{" "}
            </div>
            <div className="flex items-center gap-x-3">
              Size: {sizeUserSelect}
              {colorsUserSelect.map((color: string) => {
                return (
                  <div key={color} style={{ backgroundColor: color }} className={`w-5 h-5 rounded-full border `}></div>
                );
              })}{" "}
            </div>
          </div>
        );
      });
    },
  },
  {
    header: "Phone",
    accessorKey: "phone",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
  {
    header: "Total price",
    cell: ({ row }) => <CellPriceOrder row={row.original} />,
  },
  {
    header: "Paid",
    accessorKey: "isPaid",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <OrderCellAction row={row.original} />,
  },
];
