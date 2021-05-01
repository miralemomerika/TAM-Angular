import { CourseItemComponent } from './../components/course-item/course-item.component';
import { EventAddComponent } from '../components/events/event-add/event-add.component';
import { EventItemComponent } from '../components/event-item/event-item.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';

import { PrivacyComponent } from '../components/privacy/privacy.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RegistrationComponent } from '../components/registration/registration.component';
// import { LoginComponent } from '../core/authentication/login-user/login.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CourseItemComponent,
    EventItemComponent,
    EventAddComponent
  ],
  imports: [
    CommonModule,
    CollapseModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'privacy', component: PrivacyComponent },
      // { path: 'registration', component: RegistrationComponent },
      // { path: 'login', component: LoginComponent }
    ])
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CourseItemComponent,
    EventItemComponent,
    EventAddComponent
  ]
})
export class SharedModule { }
