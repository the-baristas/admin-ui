import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AirplaneDetailComponent } from './airplane-detail/airplane-detail.component';
import { AirplaneSearchComponent } from './airplane-search/airplane-search.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { AirplaneAddModalComponent } from './airplane-add-modal/airplane-add-modal.component';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    AirplanesComponent,
    AirplaneDetailComponent,
    MessagesComponent,
    AirplaneSearchComponent,
    LoginComponent,
    LayoutComponent,
    HomeComponent,
    AirplaneAddModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
