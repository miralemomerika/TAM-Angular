import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { PrivacyComponent } from './home/pages/privacy/privacy.component';
import { RegistrationComponent } from './home/pages/registration/registration.component';
import { LoginComponent } from './home/pages/login/login.component';
import { HomeComponent } from './home/pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'authentication', loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
