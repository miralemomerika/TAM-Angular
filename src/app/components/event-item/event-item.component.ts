import { DogadjajGet } from '../../core/models/DogadjajGet';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() dogadjajGet!: DogadjajGet;
  constructor() { }

  ngOnInit(): void {
  }

}
