import { Kurs } from './../../core/models/Kurs';
import { KursService } from './../../core/services/kurs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  public kursevi!: Kurs[];

  constructor(private kursService: KursService) {
    this.kursService.getKurseve().subscribe(x => {
      this.kursevi = x;
      console.log(this.kursevi);
    });
   }

  ngOnInit(): void {
  }
}
