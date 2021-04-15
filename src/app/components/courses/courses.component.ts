import { PrijavaService } from './../../core/services/prijava.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private prijavaService: PrijavaService) { }

  ngOnInit(): void {
  }

  Prijava(kursId: number)
  {
    this.prijavaService.addPrijava(kursId).subscribe(x => {
      console.log(x);
    });
  }

}
