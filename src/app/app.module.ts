import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AirplaneAddModalComponent } from './airplane-add-modal/airplane-add-modal.component';
import { AirplaneDeleteModalComponent } from './airplane-delete-modal/airplane-delete-modal.component';
import { AirplaneEditModalComponent } from './airplane-edit-modal/airplane-edit-modal.component';
import { AirplaneSearchComponent } from './airplane-search/airplane-search.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingAddModalComponent } from './booking-add-modal/booking-add-modal.component';
import { BookingCollapsibleRowComponent } from './booking-collapsible-row/booking-collapsible-row.component';
import { BookingEditModalComponent } from './booking-edit-modal/booking-edit-modal.component';
import { BookingSearchComponent } from './booking-search/booking-search.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FlightCollapsibleRowComponent } from './flight-collapsible-row/flight-collapsible-row.component';
import { FlightComponent } from './flight-list/flight-list.component';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './http-interceptors';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { PassengerAddModalComponent } from './passenger-add-modal/passenger-add-modal.component';
import { PassengerDeleteModalComponent } from './passenger-delete-modal/passenger-delete-modal.component';
import { PassengerEditModalComponent } from './passenger-edit-modal/passenger-edit-modal.component';
import { PassengersComponent } from './passengers/passengers.component';
import { PhonePipe } from './pipes/phone.pipe';
import { RouteCollapsibleRowComponent } from './route-collapsible-row/route-collapsible-row.component';
import { RouteListComponent } from './route-list/route-list.component';
import { TicketCollapsibleRowComponent } from './ticket-collapsible-row/ticket-collapsible-row.component';
import { UserCollapsibleRowComponent } from './user-collapsible-row/user-collapsible-row.component';
import { UserDeleteModalComponent } from './user-delete-modal/user-delete-modal.component';
import { UsersListComponent } from './users-list/users-list.component';

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
        TicketCollapsibleRowComponent
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
