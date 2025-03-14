import { MovementEvent } from "../types/movement";

export const movementStubs: MovementEvent[] = [
  {
    type: "notification",
    event: "new_movement",
    data: {
      movement_id: "A1B2C3D4E5F6G7H8",
      movement_type: "inbound",
      units: 42,
      product_id: "prod123",
      product_name: "Widget A",
    },
    metadata: { timestamp: "2025-03-13T12:00:00Z" },
  },
  {
    type: "notification",
    event: "new_movement",
    data: {
      movement_id: "X9Y8Z7W6V5U4T3S2",
      movement_type: "outbound",
      units: 15,
      product_id: "prod456",
      product_name: "Gadget B",
    },
    metadata: { timestamp: "2025-03-13T12:05:00Z" },
  },
  {
    type: "notification",
    event: "new_movement",
    data: {
      movement_id: "K1L2M3N4O5P6Q7R8",
      movement_type: "inbound",
      units: 78,
      product_id: "prod789",
      product_name: "Tool C",
    },
    metadata: { timestamp: "2025-03-13T12:10:00Z" },
  },
];