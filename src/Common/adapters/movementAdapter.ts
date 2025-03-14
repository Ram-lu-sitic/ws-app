import { ColumnDef } from "@tanstack/react-table";
import { MovementData, MovementEvent } from "../types/movement";

// Contrato para el adaptador
export interface DataAdapter<TData, TSource = any> {
  transform: (source: TSource[]) => TData[];
  columns: ColumnDef<TData>[];
}

// Adaptador específico para MovementEvent -> MovementData
export const movementAdapter: DataAdapter<MovementData, MovementEvent> = {
  transform: (events: MovementEvent[]) => events.map((event) => event.data),
  columns: [
    { accessorKey: "movement_id", header: "Movement ID" },
    { accessorKey: "movement_type", header: "Type" },
    { accessorKey: "units", header: "Units" },
    { accessorKey: "product_id", header: "Product ID" },
    { accessorKey: "product_name", header: "Product Name" },
  ],
};