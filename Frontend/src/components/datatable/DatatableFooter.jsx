import React from "react";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowBigLeftDash,
  ArrowBigRightDash,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DatatableFooter = ({ table }) => {
  return (
    <div className="flex flex-wrap items-center justify-between py-4 gap-4">
        <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
            Página <strong>{table.getState().pagination.pageIndex + 1}</strong> de{" "}
            <strong>{table.getPageCount()}</strong>
            </span>

            <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="rounded-md border px-2 py-1 text-sm"
            >
            {[5, 10, 20, 50, 100].map((size) => (
                <option key={size} value={size}>
                {size} por página
                </option>
            ))}
            </select>

            <div className="text-sm text-muted-foreground whitespace-nowrap">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} seleccionadas.
            </div>
        </div>

        <div className="flex items-center space-x-1">
            <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            >
            <ArrowBigLeftDash />
            </Button>

            <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            <ArrowBigLeft />
            </Button>

            {Array.from({ length: table.getPageCount() }).map((_, index) => {
            const isActive = index === table.getState().pagination.pageIndex;
            if (
                index === 0 ||
                index === table.getPageCount() - 1 ||
                Math.abs(index - table.getState().pagination.pageIndex) <= 1
            ) {
                return (
                <button
                    key={index}
                    onClick={() => table.setPageIndex(index)}
                    className={`rounded px-2 py-1 text-sm ${
                    isActive
                        ? "bg-gray-200 font-semibold"
                        : "text-muted-foreground hover:bg-gray-100"
                    }`}
                >
                    {index + 1}
                </button>
                );
            } else if (
                Math.abs(index - table.getState().pagination.pageIndex) === 2
            ) {
                return (
                <span key={index} className="px-1 text-sm text-muted-foreground">
                    …
                </span>
                );
            } else {
                return null;
            }
            })}

            <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            <ArrowBigRight />
            </Button>

            <Button
            variant="ghost"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            >
            <ArrowBigRightDash />
            </Button>
        </div>
    </div>
  );
};

export default DatatableFooter;
