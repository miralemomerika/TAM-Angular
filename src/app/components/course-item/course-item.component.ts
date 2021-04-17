import { Kurs } from './../../core/models/Kurs';
import { Component, Input, OnInit } from '@angular/core';
import { PrijavaService } from 'src/app/core/services/prijava.service';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})

export class CourseItemComponent implements OnInit {

  @Input() kurs!: Kurs;

  constructor(private prijavaService: PrijavaService) {
  }

  ngOnInit(): void {
  }

  Prijava(kursId: number): void
  {
    this.prijavaService.addPrijava(kursId).subscribe(x => {
      console.log(x);
    });
  }
}
