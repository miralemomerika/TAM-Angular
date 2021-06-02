import { StatistikaService } from './../../core/services/statistika.service';
import { Statistika } from './../../core/models/Statistika';
import { Component, OnInit } from '@angular/core';
import { Kurs } from 'src/app/core/models/Kurs';
import { KursService } from 'src/app/core/services/kurs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  statistika!: Statistika;
  public kursevi!: Kurs[];

  constructor(private statistikaService: StatistikaService, private kursService: KursService) {
    this.statistikaService.getStatistika().subscribe(x => {
      this.statistika = x;
    });
    this.kursService.getNajpopularnije().subscribe(x => {
      this.kursevi = x;
    });
   }

  ngOnInit(): void {
  }


}
