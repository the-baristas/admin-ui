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
    airplane: {
        id: number;
        firstClassSeatsMax: number;
        businessClassSeatsMax: number;
        economyClassSeatsMax: number;
        model: string;
    }
    routeId: string;
    airplaneId: string;
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
  