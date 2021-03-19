import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

import { PrivacyComponent } from '../home/pages/privacy/privacy.component';
import { RegistrationComponent } from '../home/pages/registration/registration.component';
import { LoginComponent } from '../home/pages/login/login.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    CollapseModule,
    RouterModule.forChild([
      { path: 'privacy', component: PrivacyComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
