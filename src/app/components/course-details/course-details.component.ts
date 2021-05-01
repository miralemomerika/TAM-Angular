import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Kurs } from 'src/app/core/models/Kurs';
import { PrijavaService } from 'src/app/core/services/prijava.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

   public kurs!: Kurs;
  constructor(private http: HttpClient, private prijavaService: PrijavaService) {
    this.kurs = history.state.data.kurs;
  }

  ngOnInit(): void {
  }

  Prijava(kursId: any): void
  {
    this.prijavaService.addPrijava(kursId).subscribe(x => {
      console.log(x);
    });
  }
}
