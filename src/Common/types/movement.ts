export interface MovementData {
    movement_id: string;
    movement_type: string;
    units: number;
    product_id: string;
    product_name: string;
}

export interface MovementEvent {
    type: string;
    event: string;
    data: MovementData;
    metadata: {
        timestamp: string;
    }
}