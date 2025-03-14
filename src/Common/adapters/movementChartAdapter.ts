// First, let's update the movementChartAdapter.ts to match your Chart's expected data structure

import { AxisOptions } from "react-charts";
import { MovementEvent } from "../types/movement";

// Chart data point interface
interface ChartPoint {
  timestamp: Date;
  units: number;
}

// Chart adapter contract - modified to match Chart.tsx expectations
export interface ChartAdapter<TData, TSource = any> {
  transform: (source: TSource[]) => Array<{ label: string; data: TData[] }>;
  primaryAxis: AxisOptions<TData>;
  secondaryAxes: AxisOptions<TData>[];
}

// Specific adapter for MovementEvent -> ChartPoint
export const movementChartAdapter: ChartAdapter<ChartPoint, MovementEvent> = {
  transform: (events: MovementEvent[]): Array<{ label: string; data: ChartPoint[] }> => {
    const decreasingTypes = ["sale", "adjustment-out", "transfer-out"];
    
    if (events.length === 0) {
      return [{
        label: "Inventory Units",
        data: [] // This now matches your Chart component's expected format
      }];
    }

    let cumulativeUnits = 0;
    const points = events.map((event) => {
      // Add optional chaining to safely access potentially undefined properties
      const movementType = event.data?.movement_type;
      const units = event.data?.units || 0;
      
      const unitsChange = movementType && decreasingTypes.includes(movementType)
        ? -units
        : units;
        
      cumulativeUnits += unitsChange;
      
      return {
        timestamp: new Date(event.metadata?.timestamp || Date.now()),
        units: cumulativeUnits,
      };
    });

    return [{
      label: "Inventory Units",
      data: points // Using 'data' instead of 'datums' to match Chart.tsx
    }];
  },
  
  primaryAxis: {
    getValue: (datum: ChartPoint) => datum.timestamp,
    scaleType: "time",
  } as AxisOptions<ChartPoint>,
  
  secondaryAxes: [{
    getValue: (datum: ChartPoint) => datum.units,
    scaleType: "linear",
  } as AxisOptions<ChartPoint>]
};

// Function to adjust axis limits based on data
export const adjustAxesLimits = <TData>(
  data: Array<{ label: string; data: TData[] }>, // Updated to match expected format
  primaryAxis: AxisOptions<TData>,
  secondaryAxes: AxisOptions<TData>[]
): { primaryAxis: AxisOptions<TData>; secondaryAxes: AxisOptions<TData>[] } => {
  // Check if any series has data
  const hasData = data.some((series) => series.data.length > 0);
  
  // For the primary time axis
  let adjustedPrimaryAxis: AxisOptions<TData>;
  if (!hasData && primaryAxis.scaleType === "time") {
    adjustedPrimaryAxis = {
      ...primaryAxis,
      // Use proper Date objects for time axis
      min: new Date(Date.now() - 3600000),
      max: new Date()
    } as unknown as AxisOptions<TData>;
  } else {
    adjustedPrimaryAxis = { ...primaryAxis };
  }
  
  // For secondary axes
  const adjustedSecondaryAxes = secondaryAxes.map(axis => {
    if (!hasData) {
      return {
        ...axis,
        min: 0,
        max: 100
      } as unknown as AxisOptions<TData>;
    }
    return axis;
  });
  
  return {
    primaryAxis: adjustedPrimaryAxis,
    secondaryAxes: adjustedSecondaryAxes
  };
};