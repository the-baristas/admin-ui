export interface Route {
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
}
  