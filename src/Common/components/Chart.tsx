// Chart.tsx
import { Chart as TanStackChart, AxisOptions } from "react-charts";

interface ChartProps<TData> {
  data: { label: string; data: TData[] }[];
  primaryAxis: AxisOptions<TData>;
  secondaryAxes: AxisOptions<TData>[];
}

// Estilo corregido usando la propiedad correcta 'styles'
const axisStyles = {
  tickLabels: { 
    fill: "var(--color-complementary)",
    fontsize: 20 // O usar className si aplica
  },
  line: {},
  tick: {}
};

export function Chart<TData>({
  data,
  primaryAxis,
  secondaryAxes,
}: ChartProps<TData>) {
  const hasData = data?.some(series => series.data?.length > 0);

  return (
    <div className="w-full h-[500px] bg-darkmode-secondary text-complementary rounded-lg p-4">
      {hasData ? (
        <TanStackChart
          options={{
            data,
            primaryAxis: {
              ...primaryAxis,
              styles: axisStyles // Corregido a 'styles'
            },
            secondaryAxes: secondaryAxes.map(axis => ({
              ...axis,
              styles: axisStyles // Corregido a 'styles'
            })),
            defaultColors: ["var(--color-lightmode-secondary)"],
            padding: { bottom: 40, right: 40 },
            
          }}
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          Esperando datos...
        </div>
      )}
    </div>
  );
}