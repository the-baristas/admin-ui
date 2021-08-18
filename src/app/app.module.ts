import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AirplaneAddModalComponent } from './airplanes/airplane-add-modal/airplane-add-modal.component';
import { AirplaneDeleteModalComponent } from './airplanes/airplane-delete-modal/airplane-delete-modal.component';
import { AirplaneEditModalComponent } from './airplanes/airplane-edit-modal/airplane-edit-modal.component';
import { AirplaneSearchComponent } from './airplanes/airplane-search/airplane-search.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingAddModalComponent } from './bookings/booking-add-modal/booking-add-modal.component';
import { BookingCollapsibleRowComponent } from './passengers/booking-collapsible-row/booking-collapsible-row.component';
import { BookingEditModalComponent } from './bookings/booking-edit-modal/booking-edit-modal.component';
import { BookingSearchComponent } from './bookings/booking-search/booking-search.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FlightCollapsibleRowComponent } from './passengers/flight-collapsible-row/flight-collapsible-row.component';
import { FlightComponent } from './flight-list/flight-list.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './http-interceptors';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './layout/messages/messages.component';
import { PassengerAddModalComponent } from './passengers/passenger-add-modal/passenger-add-modal.component';
import { PassengerDeleteModalComponent } from './passengers/passenger-delete-modal/passenger-delete-modal.component';
import { PassengerEditModalComponent } from './passengers/passenger-edit-modal/passenger-edit-modal.component';
import { PassengersComponent } from './passengers/passengers.component';
import { PhonePipe } from './pipes/phone.pipe';
import { RouteCollapsibleRowComponent } from './passengers/route-collapsible-row/route-collapsible-row.component';
import { RouteListComponent } from './route-list/route-list.component';
import { TicketCollapsibleRowComponent } from './passengers/ticket-collapsible-row/ticket-collapsible-row.component';
import { UserCollapsibleRowComponent } from './passengers/user-collapsible-row/user-collapsible-row.component';
import { UserDeleteModalComponent } from './users-list/user-delete-modal/user-delete-modal.component';
import { UsersListComponent } from './users-list/users-list.component';
import { DiscountListComponent } from './discount-list/discount-list.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { DiscountRowComponent } from './discount-list/discount-row/discount-row.component';
import { FlightEmailButtonComponent } from './flight-list/flight-email-button/flight-email-button.component';
import { FlightUploadButtonComponent } from './flight-list/flight-upload-button/flight-upload-button.component';

@NgModule({
    declarations: [
        AppComponent,
        AirplanesComponent,
        MessagesComponent,
        AirplaneSearchComponent,
        LoginComponent,
        LayoutComponent,
        HomeComponent,
        AirplaneAddModalComponent,
        AirplaneEditModalComponent,
        AirplaneDeleteModalComponent,
        BookingsComponent,
        BookingSearchComponent,
        BookingAddModalComponent,
        BookingEditModalComponent,
        UsersListComponent,
        HeaderComponent,
        UserDeleteModalComponent,
        PhonePipe,
        FlightComponent,
        RouteListComponent,
        PassengersComponent,
        PassengerEditModalComponent,
        PassengerAddModalComponent,
        PassengerDeleteModalComponent,
        BookingCollapsibleRowComponent,
        FlightCollapsibleRowComponent,
        RouteCollapsibleRowComponent,
        UserCollapsibleRowComponent,
        TicketCollapsibleRowComponent,
        DiscountListComponent,
        DiscountPipe,
        DiscountRowComponent,
        FlightEmailButtonComponent,
        FlightUploadButtonComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientXsrfModule,
        NgbModule,
        ReactiveFormsModule,
        NgHttpLoaderModule.forRoot()
    ],
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule {}
