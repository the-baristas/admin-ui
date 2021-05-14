import { HttpClientModule } from '@angular/common/http';
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
import { BookingEditModalComponent } from './booking-edit-modal/booking-edit-modal.component';
import { BookingSearchComponent } from './booking-search/booking-search.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FlightComponent } from './flight-list/flight-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { PhonePipe } from './pipes/phone.pipe';
import { RouteListComponent } from './route-list/route-list.component';
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
        RouteListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        NgHttpLoaderModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
