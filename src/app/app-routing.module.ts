import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirplaneDetailComponent } from './airplane-detail/airplane-detail.component';
import { AirplaneSearchComponent } from './airplane-search/airplane-search.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'detail/:id', component: AirplaneDetailComponent },
            { path: 'airplane-search', component: AirplaneSearchComponent },
            { path: 'airplanes', component: AirplanesComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
