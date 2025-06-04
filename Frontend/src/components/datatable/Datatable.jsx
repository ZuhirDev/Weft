import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, ChevronsUpDown, Loader2 } from 'lucide-react';
import { get } from '@/utils/xhr';
import DatatableColumnFilter from './DatatableColumnFilter';
import { useDebounce } from 'use-debounce';
import Papa from 'papaparse';
import { format } from 'date-fns';
import DatatableToolbar from './DatatableToolbar';
import DatatableFooter from './DatatableFooter';

const Datatable = ({ columns, remote, initialSorting }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState(initialSorting || []);
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [debouncedGlobalFilter] = useDebounce(globalFilter, 300);
  const [debouncedColumnFilters] = useDebounce(columnFilters, 300);
  const [debouncedSorting] = useDebounce(sorting, 0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize,
        globalSearch: {
          search: debouncedGlobalFilter ?? '',
          columns: columns
            .filter(col => col.searchable !== false)
            .map(col => ({ field: col.id, title: col.header })),
        },
        filters: debouncedColumnFilters.map(filter => ({
          field: filter.id,
          value: filter.value,
        })),
        orderByCollection: debouncedSorting.map(sort => ({
          column: sort.id,
          direction: sort.desc ? 'desc' : 'asc',
        })),
      };

      const response = await get({ url: remote, params });
      setData(response.data.data);
      setRowCount(response.data.totalCount);
    } catch (error) {
      console.error('Error', error);
    } finally {
      setLoading(false);
    }
  }, [remote, pagination, debouncedSorting, debouncedGlobalFilter, debouncedColumnFilters, columns]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleExportCSV = () => {
    const visibleColumns = table
      .getVisibleLeafColumns()
      .filter(col => col.columnDef.enableExport !== false);

    const headers = visibleColumns.map(col => col.columnDef.header);

    const sourceRows =
      table.getSelectedRowModel().rows.length > 0
        ? table.getSelectedRowModel().rows
        : table.getRowModel().rows;

    const rows = sourceRows.map(row =>
      visibleColumns.reduce((acc, column) => {
        const cell = row.getValue(column.id);
        return { ...acc, [column.columnDef.header]: cell };
      }, {})
    );

    const csv = Papa.unparse({ fields: headers, data: rows });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${format(new Date(), 'dd-MM-yyyy')}.csv`;
    link.click();
  };

  const table = useReactTable({
    data,
    columns,
    rowCount,
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, globalFilter, columnVisibility, rowSelection, pagination },
  });

return (
  <div className="space-y-4">
    <DatatableToolbar table={table} handleExportCSV={handleExportCSV} />

    <div className="rounded-md border border-gray-200 dark:border-zinc-700 overflow-auto">
      <Table className="min-w-full">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} className="whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {!header.isPlaceholder && (
                      <div
                        className={`${
                          header.column.getCanSort()
                            ? "flex cursor-pointer select-none items-center"
                            : "flex items-center"
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="ml-1">
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                    {header.column.getCanFilter() && <DatatableColumnFilter column={header.column} />}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <div className="flex justify-center items-center h-40">
                  <Loader2 className="animate-spin h-8 w-8 text-white-500 dark:text-zinc-400" />
                </div>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="dark:hover:bg-zinc-900 transition-colors duration-150"
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-gray-600 dark:text-zinc-400">
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    <DatatableFooter table={table} />
  </div>
);

};

export default Datatable;
