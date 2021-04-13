import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirplanesComponent } from './airplanes/airplanes.component';

const routes: Routes = [
    { path: 'airplanes', component: AirplanesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
