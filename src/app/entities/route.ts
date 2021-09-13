export interface Route {
  id: number;
  originAirport: {
    iataId: string;
    city: string;
    isActive: boolean;
  }
  destinationAirport: {
    iataId: string;
    city: string;
    isActive: boolean;
  }
  originId: string;
  destinationId: string;
  isActive: boolean;
}
