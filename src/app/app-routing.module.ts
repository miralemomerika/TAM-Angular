import { ContactComponent } from './components/contact/contact.component';
import { TrainersComponent } from './components/trainers/trainers.component';
import { EventsComponent } from './components/events/events.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AboutComponent } from './components/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login-user/login.component';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { Error404Component } from './components/error404/error404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { IspitComponent } from './components/ispit/ispit.component';
import { GuardGuard } from './core/services/guard.guard';
import { StudentIspitComponent } from './components/student-ispit/student-ispit.component';
import { StudentIspitDetaljiComponent } from './components/student-ispit-detalji/student-ispit-detalji.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'authentication', loadChildren: () => import('./core/authentication/authentication.module').then( m => m.AuthenticationModule)},
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'events', component: EventsComponent },
  { path: 'course-details', component: CourseDetailsComponent },
  { path: 'trainers', component: TrainersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event-details', component: EventDetailsComponent},
  { path: 'exams', component: IspitComponent },
  { path: 'student-exams', component: StudentIspitComponent },
  { path: 'ispit-detalji', component: StudentIspitDetaljiComponent },
  // { path: 'authentication/register', component: RegisterUserComponent },
  {
    path: '404',
    component: Error404Component,
    data: { title: 'Page 404' },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ,
  FormsModule,
ReactiveFormsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  AboutComponent,
  CoursesComponent,
  EventsComponent,
  CourseDetailsComponent,
  HomeComponent,
  EventDetailsComponent,
  IspitComponent,
  StudentIspitComponent,
  StudentIspitDetaljiComponent
];
