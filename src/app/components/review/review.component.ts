import { RecenzijaService } from './../../core/services/recenzija.service';
import { AktivneRecenzije } from './../../core/models/AktivneRecenzije';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public recenzije!: AktivneRecenzije[];

  constructor(private recenzijeService: RecenzijaService) {
    this.recenzijeService.getAktivneRecenzije().subscribe(x => {
      this.recenzije = x;
      console.log(this.recenzije);
    });
   }

  ngOnInit(): void {
  }

}
