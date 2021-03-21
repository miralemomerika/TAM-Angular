import { ContactComponent } from './components/contact/contact.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { EventsComponent } from './components/events/events.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'authentication', loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'about', component: AboutComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'events', component: EventsComponent},
  { path: 'course-details', component: CourseDetailsComponent},
  { path: 'trainers', component: TrainersComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ AboutComponent, CoursesComponent, EventsComponent, CourseDetailsComponent,
HomeComponent];
