import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IspitGet } from 'src/app/core/models/IspitGet';
import { RadGet } from 'src/app/core/models/RadGet';
import { RadOcijeni } from 'src/app/core/models/RadOcijeni';
import { RadService } from 'src/app/core/services/rad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ispit-detalji',
  templateUrl: './ispit-detalji.component.html',
  styleUrls: ['./ispit-detalji.component.css']
})
export class IspitDetaljiComponent implements OnInit, OnDestroy {

  ispit!: IspitGet;
  radovi!: RadGet[];
  ocjena!: number;
  vremenaPostavljanjaRada!: string[];
  public errorMessage: string = '';
  public showError: boolean = false;
  public successMessage: string = '';
  public showSuccess: boolean = false;
  public vrijemePocetka?: string;
  public vrijemeZavrsetka?: string;

  constructor(private router: Router, private radService: RadService) {

    if(localStorage.getItem('ispit') === undefined || localStorage.getItem('ispit') === null){
      localStorage.removeItem('ispit');
      this.ispit = history.state.data.ispit;
      localStorage.setItem('ispit', JSON.stringify(this.ispit));
    }
    else{
      this.ispit = JSON.parse(localStorage.getItem('ispit')!);
    }

    this.vrijemePocetka = this.ispit.vrijemePocetka !== undefined ? this.convertDate(this.ispit.vrijemePocetka) : "-- NONE --";
    this.vrijemeZavrsetka = this.ispit.vrijemeZavrsetka !== undefined ? this.convertDate(this.ispit.vrijemeZavrsetka) : "-- NONE --";

    this.radService.GetRadoveIspita(this.ispit.id!).subscribe(data => {
      this.radovi = data;
      //izbrisati
      console.log(this.radovi);
    });

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.removeItem('ispit');
  }

  public examPath(link?: string){
    return link === null ? '#' : environment.urlAddress + link;
  }

  public convertDate = (date: string):string => {
    let datumivrijeme;
    let year=date?.substr(0,4);
    let month=date?.substr(5,2);
    let day=date?.substr(8,2);
    let hour=date?.substr(11,2);
    let minutes=date?.substr(14,2);   
    if(date!==undefined)
      return datumivrijeme=day+"."+month+"."+year+" "+hour+":"+minutes;
    return "-- NONE --";
  }

  ocijeniRad = (rad: RadGet, event: any) => {

    this.showError = false;
    this.showSuccess = false;
    //izbrisati
    console.log(rad);
    console.log(event.target.value);
    console.log(this.ispit.organizacijaKursaId);
    //_________
    let ocjenaRada = event.target.value;

    if(ocjenaRada < 5 || ocjenaRada > 10){
      this.errorMessage = "Ocjene su od 5 do 10!";
      this.showError = true;
    }
    else{

      const ocjena: RadOcijeni = {
        polaznikId: rad.polaznikId,
        organizacijaKursaId: this.ispit.organizacijaKursaId,
        ocjena: ocjenaRada
      }

      this.radService.OcijeniRad(ocjena).subscribe(_ => {
        this.successMessage = `Uspjesno ocijenjen ${rad.imePrezimePolaznika} ocjenom ${ocjenaRada}`;
        this.showSuccess = true;
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })

    }

  }

}
