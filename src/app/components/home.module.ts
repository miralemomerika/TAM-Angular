import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseItemComponent } from './course-item/course-item.component';

@NgModule({
  declarations: [
   CourseItemComponent],
  imports: [
    CommonModule, 
    AppRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
