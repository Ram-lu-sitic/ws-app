// import { useState } from "react";
// import { Card } from "./Common/components/Card";
// import { SheetTable } from "./Common/components/SheetTable";
// import { Chart } from "./Common/components/Chart";
// import { useSheetTable } from "./Common/hooks/useSheetTable";
// import { useChart } from "./Common/hooks/useChart";
// import ChartImage from "./assets/charts.svg";
// import SheetImage from "./assets/sheets.webp";

// const App = () => {
//   const [activeComponent, setActiveComponent] = useState<"charts" | "sheets" | null>(null);

//   // Conectar WebSocket solo cuando un componente está activo
//   const { data: sheetData, columns: sheetColumns } = useSheetTable(activeComponent !== null);
//   const { data: chartData, primaryAxis, secondaryAxes } = useChart(activeComponent !== null);

//   const handleSelectComponent = (type: "charts" | "sheets" | null) => {
//     setActiveComponent(type);
//   };

//   return (
//     <div className="p-4 wrapper">
//       {/* Botones para seleccionar componente */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//         <Card
//           imageUrl={ChartImage}
//           title="Charts"
//           description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//           onClick={() => handleSelectComponent("charts")}
//         />
//         <Card
//           imageUrl={SheetImage}
//           title="Sheets"
//           description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//           onClick={() => handleSelectComponent("sheets")}
//         />
//       </div>

//       {/* Renderizar el componente activo */}
//       {activeComponent === "charts" && (
//         <div className="mt-4">
//           <h2 className="text-4xl text-complementary font-bold mb-2">Charts</h2>
//           <Chart
//             data={chartData}
//             primaryAxis={primaryAxis}
//             secondaryAxes={secondaryAxes}
//           />
//           <button
//             className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
//             onClick={() => handleSelectComponent(null)}
//           >
//             Cerrar
//           </button>
//         </div>
//       )}
//       {activeComponent === "sheets" && (
//         <div className="mt-4">
//           <h2 className="text-xl font-bold mb-2">Sheets</h2>
//           <SheetTable data={sheetData} columns={sheetColumns} />
//           <button
//             className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
//             onClick={() => handleSelectComponent(null)}
//           >
//             Cerrar
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import { useState } from "react";
import { Card } from "./Common/components/Card";
import { SheetTable } from "./Common/components/SheetTable";
import { Chart } from "./Common/components/Chart";
import { useSheetTable } from "./Common/hooks/useSheetTable";
import { useChart } from "./Common/hooks/useChart";
import { useWebSocket } from "./Common/hooks/useWebSocket";
import { movementAdapter } from "./Common/adapters/movementAdapter";
import ChartImage from "./assets/charts.svg";
import SheetImage from "./assets/sheets.webp";
import { movementChartAdapter } from "./Common/adapters/movementChartAdapter";
import { movementStubs } from "./Common/stubs/movementStubs";

type ViewType = "charts" | "sheets";

interface ViewComponent {
  id: ViewType;
  title: string;
  imageUrl: string;
  render: () => JSX.Element;
}

const App = () => {
  const [activeComponent, setActiveComponent] = useState<ViewType | null>(null);

  const { events } = useWebSocket("ws://localhost:8081/websocket", activeComponent !== null);
  const eventStub = movementStubs
  const { data: sheetData, columns: sheetColumns } = useSheetTable(eventStub, movementAdapter);
  const { data: chartData, primaryAxis, secondaryAxes } = useChart(eventStub, movementChartAdapter);

  const views: ViewComponent[] = [
    {
      id: "charts",
      title: "Charts",
      imageUrl: ChartImage,
      render: () => (
        <Chart data={chartData} primaryAxis={primaryAxis} secondaryAxes={secondaryAxes} />
      ),
    },
    {
      id: "sheets",
      title: "Sheets",
      imageUrl: SheetImage,
      render: () => <SheetTable data={sheetData} columns={sheetColumns} />,
    },
  ];

  return (
    <div className="p-4 wrapper">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {views.map((view) => (
          <Card
            key={view.id}
            imageUrl={view.imageUrl}
            title={view.title}
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            onClick={() => setActiveComponent(view.id)}
          />
        ))}
      </div>
      {activeComponent && (
        <div className="mt-4">
          <h2 className="text-4xl text-complementary font-bold mb-2">
            {views.find((v) => v.id === activeComponent)?.title}
          </h2>
          {views.find((v) => v.id === activeComponent)?.render()}
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setActiveComponent(null)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default App;