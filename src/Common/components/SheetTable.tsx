import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

// Contrato para las props del componente
interface SheetTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
}

// Lista de movement_types que disminuyen unidades
const decreasingTypes = ["sale", "adjustment-out", "transfer-out"];

export function SheetTable<TData>({ data, columns }: SheetTableProps<TData>) {
  // Añadimos la columna de flechas dinámicamente
  const enhancedColumns = useMemo(() => {
    const arrowColumn: ColumnDef<TData, any> = {
      id: "direction",
      header: "",
      cell: ({ row }) => {
        const movementType = (row.original as any).movement_type;
        const isDecreasing = decreasingTypes.includes(movementType);
        return (
          <span className={isDecreasing ? "text-red-500" : "text-green-500"}>
            {isDecreasing ? "↓" : "↑"}
          </span>
        );
      },
    };
    return [...columns, arrowColumn];
  }, [columns]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 bg-darkmode-secondary text-complementary border-b border-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-darkmode-primary">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-2 text-complementary border-b border-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}