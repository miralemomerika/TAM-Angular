import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IspitRad } from 'src/app/core/models/IspitRad';
import { RadDodaj } from 'src/app/core/models/RadDodaj';
import { RadService } from 'src/app/core/services/rad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-ispit-detalji',
  templateUrl: './student-ispit-detalji.component.html',
  styleUrls: ['./student-ispit-detalji.component.css']
})
export class StudentIspitDetaljiComponent implements OnInit, OnDestroy {

  @Input() ispit!: IspitRad;
  public uploadLink: string = 'api/rad/upload';

  public vrijemePocetka?: string;
  public vrijemeZavrsetka?: string;
  public isAdd: boolean = false;
  public response2!: {dbPath: ' '};
  public nazivRada?: string;

  constructor(private http: HttpClient, private radService: RadService, private router: Router) {

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
    if(this.ispit.radId === null || this.ispit.radId === undefined || this.ispit.radId === 0)
      this.isAdd = true;

    if(!this.isAdd){

      let naziv = this.ispit.urlRada?.split("").reverse().join("")!;
      let brojac = naziv.indexOf('/');
      let naopakiNaziv = naziv?.substr(0, brojac);
      this.nazivRada = naopakiNaziv?.split("").reverse().join("");
    }

   }

  ngOnInit(): void {
    console.log(this.ispit);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('ispit');
  }
  
  public examPath(link?: string){
    return this.ispit.urlIspita === null ? '#' : environment.urlAddress + link;
  }

  public uploadFinished = (event: any) => {
    this.response2 = event;
  }

  public convertDate = (date: string):string => {
    let datumivrijeme;
    let year=date?.substr(0,4);
    let month=date?.substr(5,2);
    let day=date?.substr(8,2);
    let hour=date?.substr(11,2);
    let minutes=date?.substr(14,2);   
    if(date!==undefined)
      return datumivrijeme=day+"/"+month+"/"+year+" "+hour+":"+minutes;
    return "-- NONE --";
  }

  public dodaj(){

    const rad: RadDodaj = {
      ispitId: this.ispit.ispitId,
      urlDokumenta: this.response2.dbPath
    };
    
    console.log(rad);

    this.radService.PostaviRad(rad).subscribe(_ => {
      this.router.navigate(['/student-exams']);
    })

  }

}
