
export interface Flight {
    id: number;
    routeId: number;
    airplaneId: number;
    departureTime: string;
    arrivalTime: string;
    firstReserved: number;
    firstPrice: number;
    businessReserved: number;
    businessPrice: number;
    economyReserved: number;
    economyPrice: number;
    isActive: number;
}