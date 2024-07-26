"use client";

import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { ColorType } from "@/Type/ColorType";
import { Button } from "@/components/ui/button";
import ColorCellAction from "@/app/(stores)/[storeId]/colors/[colorId]/_table_color/cellColorActions";

export const ColorColumns: ColumnDef<ColorType>[] = [
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
    cell: ({ row }) => {
      return <div style={{ backgroundColor: row.getValue("value") }} className={`w-5 h-5 rounded-full border `}></div>;
    },
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
    cell: ({ row }) => <ColorCellAction row={row.original} />,
  },
];
