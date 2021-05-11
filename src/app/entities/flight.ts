export interface Flight {
    id: number;
    route: {
      id: number;
      originAirport: {
        iataId: string;
        city: string;
        isActive: number;
  }
      destinationAirport: {
        iataId: string;
        city: string;
        isActive: number;
  }
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
    isActive: boolean;
  }
  