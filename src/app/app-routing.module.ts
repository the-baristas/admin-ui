import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FlightComponent } from './flight-list/flight-list.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RouteListComponent } from './route-list/route-list.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'users', component: UsersListComponent },
            { path: 'airplanes', component: AirplanesComponent },
            { path: 'bookings', component: BookingsComponent },
            { path: 'routes', component: RouteListComponent },
            { path: 'flights', component: FlightComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
