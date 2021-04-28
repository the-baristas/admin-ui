import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AirplaneSearchComponent } from './airplane-search/airplane-search.component';
import { AirplanesComponent } from './airplanes/airplanes.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { AirplaneAddModalComponent } from './airplane-add-modal/airplane-add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AirplaneEditModalComponent } from './airplane-edit-modal/airplane-edit-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component'

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
    DeleteModalComponent
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
