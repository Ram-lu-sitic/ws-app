// import { useMemo } from "react";
// import { AxisOptions } from "react-charts";
// import { useWebSocket } from "./useWebSocket";
// import { movementStubs } from "../stubs/movementStubs";

// interface ChartPoint {
//   timestamp: Date;
//   units: number;
// }

// const decreasingTypes = ["sale", "adjustment-out", "transfer-out"];

// export const useChart = (shouldConnect: boolean) => {
//   // const { events } = useWebSocket(shouldConnect);
//   const events = movementStubs

//   const data = useMemo(() => {
//     if (events.length === 0) {
//       return [
//         {
//           label: "Inventory Units",
//           data: [],
//         },
//       ];
//     }

//     let cumulativeUnits = 0;
//     const points = events.map((event) => {
//       const unitsChange = decreasingTypes.includes(event.data.movement_type)
//         ? -event.data.units
//         : event.data.units;
//       cumulativeUnits += unitsChange;
//       return {
//         timestamp: new Date(event.metadata.timestamp),
//         units: cumulativeUnits,
//       };
//     });

//     console.log("Datos del gráfico actualizados:", { label: "Inventory Units", data: points });

//     return [
//       {
//         label: "Inventory Units",
//         data: points,
//       },
//     ];
//   }, [events]);

//   const primaryAxis = useMemo<AxisOptions<ChartPoint>>(
//     () => ({
//       getValue: (datum) => datum.timestamp,
//       scaleType: "time",
//       label: "Time",
//       min: events.length > 0 ? undefined : new Date(Date.now() - 3600000),
//       max: events.length > 0 ? undefined : new Date(),
//     }),
//     [events.length]
//   );

//   const secondaryAxes = useMemo<AxisOptions<ChartPoint>[]>(
//     () => [
//       {
//         getValue: (datum) => datum.units,
//         scaleType: "linear",
//         label: "Total Units",
//         min: events.length > 0 ? undefined : 0,
//         max: events.length > 0 ? undefined : 100,
//       },
//     ],
//     [events.length]
//   );

//   return { data, primaryAxis, secondaryAxes };
// };

import { useMemo } from "react";
import { ChartAdapter, adjustAxesLimits } from "../adapters/movementChartAdapter";

export const useChart = <TData, TSource = any>(
  sourceData: TSource[],
  adapter: ChartAdapter<TData, TSource>
) => {
  const data = useMemo(() => adapter.transform(sourceData), [sourceData, adapter]);
  const { primaryAxis, secondaryAxes } = useMemo(
    () => adjustAxesLimits(data, adapter.primaryAxis, adapter.secondaryAxes),
    [data, adapter]
  );

  return { data, primaryAxis, secondaryAxes };
};