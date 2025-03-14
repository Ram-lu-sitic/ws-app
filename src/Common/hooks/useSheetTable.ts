// import { ColumnDef } from "@tanstack/react-table";
// import { MovementData } from "../types/movement";
// import { useWebSocket } from "./useWebSocket";
// import { movementStubs } from "../stubs/movementStubs";

// export const useSheetTable = (shouldConnect: boolean) => {
//   // const { events } = useWebSocket(shouldConnect);
//   const events = movementStubs;

//   const data: MovementData[] = events.map((event) => event.data);
//   console.log("Datos de la tabla actualizados:", data);

//   const columns: ColumnDef<MovementData>[] = [
//     { accessorKey: "movement_id", header: "Movement ID" },
//     { accessorKey: "movement_type", header: "Type" },
//     { accessorKey: "units", header: "Units" },
//     { accessorKey: "product_id", header: "Product ID" },
//     { accessorKey: "product_name", header: "Product Name" },
//   ];

//   return { data, columns };
// };

import { DataAdapter } from "../adapters/movementAdapter";

export const useSheetTable = <TData, TSource = any>(
  sourceData: TSource[],
  adapter: DataAdapter<TData, TSource>
) => {
  const data = adapter.transform(sourceData);
  const columns = adapter.columns;

  return { data, columns };
};