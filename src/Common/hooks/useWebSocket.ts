// import { useState, useEffect } from "react";
// import { MovementEvent } from "../types/movement";

// const WEBSOCKET_URL = "ws://localhost:8081/websocket";

// export const useWebSocket = (shouldConnect: boolean) => {
//   const [events, setEvents] = useState<MovementEvent[]>([]);

//   useEffect(() => {
//     if (!shouldConnect) return;

//     console.log("Intentando conectar al WebSocket en:", WEBSOCKET_URL);
//     const socket = new WebSocket(WEBSOCKET_URL);

//     socket.onopen = () => {
//       console.log("WebSocket conectado a:", WEBSOCKET_URL);
//     };

//     socket.onmessage = (event) => {
//       try {
//         const message: MovementEvent = JSON.parse(event.data);
//         console.log("Mensaje recibido:", message);
//         if (message.type === "notification" && message.event === "new_movement") {
//           setEvents((prevEvents) => [...prevEvents, message]);
//         }
//       } catch (error) {
//         console.error("Error al parsear el mensaje del WebSocket:", error);
//       }
//     };

//     socket.onerror = (error) => {
//       console.error("Error en el WebSocket:", error);
//     };

//     socket.onclose = (event) => {
//       console.log("WebSocket desconectado. Código:", event.code, "Razón:", event.reason);
//     };

//     return () => {
//       socket.close();
//     };
//   }, [shouldConnect]);

//   return { events };
// };

import { useState, useEffect } from "react";
import { MovementEvent } from "../types/movement";

export const useWebSocket = (url: string, shouldConnect: boolean) => {
  const [events, setEvents] = useState<MovementEvent[]>([]);

  useEffect(() => {
    if (!shouldConnect) return;

    console.log("Intentando conectar al WebSocket en:", url);
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket conectado a:", url);
    };

    socket.onmessage = (event) => {
      try {
        const message: MovementEvent = JSON.parse(event.data);
        console.log("Mensaje recibido:", message);
        if (message.type === "notification" && message.event === "new_movement") {
          setEvents((prevEvents) => [...prevEvents, message]);
        }
      } catch (error) {
        console.error("Error al parsear el mensaje del WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("Error en el WebSocket:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket desconectado. Código:", event.code, "Razón:", event.reason);
    };

    return () => {
      socket.close();
    };
  }, [url, shouldConnect]); // Dependencias: url y shouldConnect

  return { events };
};