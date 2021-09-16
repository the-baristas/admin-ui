import { BookingFlight } from './booking-flight';
import { Passenger } from './passenger';

export interface Booking {
    id: number;
    active: boolean;
    confirmationCode: string;
    layoverCount: number;
    totalPrice: number;
    passengers: Passenger[];
    flights: BookingFlight[];
    username: string;
    email: string;
    phone: string;
    stripeId: string;
    refunded: boolean;
}
