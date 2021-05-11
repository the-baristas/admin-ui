import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { UsersListComponent } from './users-list/users-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerService } from './services/pager.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { FlightService } from './services/flights.service';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './home/home.component';
import { FlightComponent } from './flight-list/flight-list.component';
import { RouteListComponent } from './route-list/route-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AirplaneSearchComponent } from './airplane-search/airplane-search.component';
import { AirplanesComponent } from './airplanes/airplanes.component';

@NgModule({
  declarations: [
    AppComponent,
    AirplanesComponent,
    AirplaneSearchComponent,
    UsersListComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    FlightComponent,
    RouteListComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [UsersService, PagerService, LoginService, FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
