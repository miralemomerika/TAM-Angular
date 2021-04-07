import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login-user/login.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';


@NgModule({
  declarations: [
    RegisterUserComponent,
    LoginComponent,
    EmailConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
    {path: 'register', component: RegisterUserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'emailconfirmation', component: EmailConfirmationComponent},
    ]),
    SharedModule
  ],
  exports: [
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
