import { StatistikaService } from './../../core/services/statistika.service';
import { Statistika } from './../../core/models/Statistika';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  statistika!: Statistika;

  constructor(private statistikaService: StatistikaService) {
    this.statistikaService.getStatistika().subscribe(x => {
      this.statistika = x;
    });
   }

  ngOnInit(): void {
  }


}
