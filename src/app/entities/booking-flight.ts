export interface BookingFlight {
    id: number;
    active: boolean;
    departureTime: string;
    arrivalTime: string;
    routeId: number;
    routeActive: boolean;
    originAirportCode: string;
    originAirportCity: string;
    originAirportActive: string;
    destinationAirportCode: string;
    destinationAirportCity: string;
    destinationAirportActive: string;
    airplaneModel: string;
}
