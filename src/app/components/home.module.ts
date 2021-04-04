import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   ],
  imports: [
    CommonModule, 
    AppRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {}
