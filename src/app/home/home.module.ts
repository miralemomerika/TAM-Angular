import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports:[]
})
export class HomeModule { }
