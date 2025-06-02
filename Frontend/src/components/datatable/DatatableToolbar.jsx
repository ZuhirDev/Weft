import React, { useState } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnsIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DatatableToolbar = ({ table, handleExportCSV }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="w-full flex justify-end items-center gap-2 flex-wrap mb-4">
      {!showSearch ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSearch(true)}
          className="flex items-center"
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <div className="relative max-w-sm w-full sm:w-auto">
          <Input
            autoFocus
            placeholder="Buscar..."
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            onBlur={() => {
              if (!table.getState().globalFilter) {
                setShowSearch(false);
              }
            }}
            className="pr-8"
          />
          {table.getState().globalFilter && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground"
              onClick={() => {
                table.setGlobalFilter("");
                setShowSearch(false);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <Button variant="outline" size="sm" onClick={handleExportCSV}>
        Exportar CSV
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <ColumnsIcon className="mr-2 h-4 w-4" />
            Columnas
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.columnDef.header}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DatatableToolbar;
