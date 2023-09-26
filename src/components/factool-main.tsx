"use client";

import { MoreHorizontal, MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FactoolSubTable } from "~/components/factool-sub";
import { Fragment, useState } from "react";
import { IFactool } from "~/ds";
import { Input } from "./ui/input";

export const columns: ColumnDef<IFactool>[] = [
  // ...
  {
    id: "actions",
    cell: ({ row }) => {
      const Icon = row.getIsExpanded() ? MoreVertical : MoreHorizontal;
      return (
        <Button
          variant="ghost"
          className="h-8 w-24 p-0"
          onClick={() => {
            const canExpanded = row.getCanExpand();
            const isExpanded = row.getIsExpanded();
            console.log({ canExpanded, isExpanded });
            row.getToggleExpandedHandler()();
          }}
        >
          <Icon className="h-4 w-4" />
        </Button>
      );
    },
  },
  // ...
  { accessorKey: "prompt" },
  { accessorKey: "category" },
  { accessorKey: "weight" },
  // { accessorKey: "responses_and_factuality", columns: [] },
];

export function FactoolMainTable({ data }: { data: IFactool[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => true,
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      // sorting,
      columnFilters,
    },
  });

  return (
    <div className={"w-full"}>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by prompt ..."
          value={(table.getColumn("prompt")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("prompt")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {row.getIsExpanded() && (
                    <tr>
                      {/* 2nd row is a custom 1 cell row */}
                      <td colSpan={row.getVisibleCells().length}>
                        <FactoolSubTable
                          data={row.original.responses_and_factuality}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
