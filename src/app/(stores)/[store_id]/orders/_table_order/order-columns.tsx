"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderType } from "@/Type/OrderTypes";
import { ProductType } from "@/Type/ProductType";
import CellPriceOrder from "@/app/(stores)/[store_id]/orders/_table_order/cell-price-order";
import OrderCellAction from "@/app/(stores)/[store_id]/orders/_table_order/cell-action-oder";

interface productOrderProps {
  _id: ProductType;
  size: string;
  color: string;
  amount: number;
}

export const OrderColumns: ColumnDef<OrderType>[] = [
  {
    header: "Products",
    accessorKey: "listProductOrder",
    cell: ({ row }) => {
      const listProductOrder: productOrderProps[] = row.getValue("listProductOrder");
      // return listProductOrder.map((productOrder: productOrderProps) => {
      //   const product: ProductType = productOrder._id;
      //   const sizeUserSelect = productOrder.size;
      //   const colorsUserSelect = productOrder.color;
      //   return (
      //     <div key={`${product._id}${colorsUserSelect}${sizeUserSelect}`}>
      //       <div>
      //         <span className="font-semibold">Name:</span> {product?.name}{" "}
      //       </div>
      //       <div className="flex items-center gap-x-3">
      //         Size: {sizeUserSelect}
      //         <div
      //           key={colorsUserSelect}
      //           style={{ backgroundColor: colorsUserSelect }}
      //           className={`w-5 h-5 rounded-full border `}
      //         />{" "}
      //         Quantity: {productOrder.amount}
      //       </div>
      //     </div>
      //   );
      // });
      return "a";
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
    accessorKey: "is_paid",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <OrderCellAction row={row.original} />,
  },
];
