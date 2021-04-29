export interface Flight {
    id: number;
    route: {
      id: number;
      originId: string;
      destinationId: string;
      isActive: number;
    };
    routeId: number
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
  