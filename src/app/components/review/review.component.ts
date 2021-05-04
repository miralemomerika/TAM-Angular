import { Recenzija } from './../../core/models/Recenzija';
import { RecenzijaService } from './../../core/services/recenzija.service';
import { AktivneRecenzije } from './../../core/models/AktivneRecenzije';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public recenzije!: AktivneRecenzije[];
  public trenutnaRecenzija!: Recenzija;
  public odabranaRecenzija!: AktivneRecenzije;

  constructor(private recenzijeService: RecenzijaService) {
    this.recenzijeService.getAktivneRecenzije().subscribe(x => {
      this.recenzije = x;
      this.trenutnaRecenzija = {
        organizacijaKursId: 1,
        ocjenaKursa: 5,
        ocjenaPredavaca: 5
      };
    });
   }

  ngOnInit(): void {
  }

  GetTrenutnu(recenzija: AktivneRecenzije): void
  {
    this.odabranaRecenzija = recenzija;
    this.trenutnaRecenzija.organizacijaKursId = recenzija.organizacijaKursId;
    console.log(this.odabranaRecenzija);
  }

  Posalji(): void
  {
    console.log(this.trenutnaRecenzija);
  }
}
