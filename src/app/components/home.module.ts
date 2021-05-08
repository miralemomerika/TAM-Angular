import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseItemComponent } from './course-item/course-item.component';
import { EventAddComponent } from './events/event-add/event-add.component';
import { EventItemComponent } from './event-item/event-item.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [
   CourseItemComponent,
    EventAddComponent,
    EventItemComponent,
    EventDetailsComponent,
    ReviewComponent
  ],
  imports: [
    CommonModule, 
    AppRoutingModule, 
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EventAddComponent,
    EventItemComponent,
    CourseItemComponent
  ]
})
export class HomeModule {}
