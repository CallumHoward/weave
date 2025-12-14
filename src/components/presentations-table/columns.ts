import type { ColumnDef } from "@tanstack/react-table";
import type { PresentationItem } from "@/types/presentation-item";

export const columns: Array<ColumnDef<PresentationItem>> = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "author",
    header: "Created by",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      return date.toDateString();
    },
  },
  {
    accessorKey: "modifiedAt",
    header: "Last modified",
    cell: ({ row }) => {
      const date: Date = row.getValue("modifiedAt");
      return date.toDateString();
    },
  },
];
