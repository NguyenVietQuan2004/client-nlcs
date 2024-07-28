"use client";

import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { SizeType } from "@/Type/SizeTypes";
import { Button } from "@/components/ui/button";
import SizeCellAction from "@/app/(stores)/[storeId]/sizes/[sizeId]/_table_size/cell-size-actions";

export const SizeColumns: ColumnDef<SizeType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    header: "Value",
    accessorKey: "value",
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = format(date, "MMMM dd yyyy");
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <SizeCellAction row={row.original} />,
  },
];
