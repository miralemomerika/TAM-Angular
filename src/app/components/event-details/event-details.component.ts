import { DogadjajGet } from './../../core/models/DogadjajGet';
import { DogadjajiService } from './../../core/services/dogadjaji.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  public dogadjaji!: DogadjajGet[];

  constructor(private dogadjajiService: DogadjajiService) {
    this.dogadjajiService.getDogadjaje().subscribe(x => {
      this.dogadjaji=x;
      // console.log(this.dogadjaji);
    });
   }

  ngOnInit(): void {
  }

}
