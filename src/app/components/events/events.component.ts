import { DogadjajGet } from './../../core/models/DogadjajGet';
import { DogadjajiService } from './../../core/services/dogadjaji.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public dogadjaji!: DogadjajGet[];

  constructor(private dogadjajiService: DogadjajiService) {
    this.dogadjajiService.getDogadjajeOrganizator().subscribe(x => {
      // this.dogadjaji = x;
      // console.log(this.dogadjaji);
    });
   }

  ngOnInit(): void {
  }

}
