import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IspitDodaj } from 'src/app/core/models/IspitDodaj';
import { IspitGet } from '../../core/models/IspitGet';
import { IspitService } from '../../core/services/ispit.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-ispit',
  templateUrl: './ispit.component.html',
  styleUrls: ['./ispit.component.css']
})
export class IspitComponent implements OnInit {

  public uploadLink: string = 'api/ispiti/upload';
  public organizacijeKurseva!: any[];
  public errorMessage: string = '';
  public showError: boolean = false;
  public response!: {dbPath: ' '};
  addIspit: FormGroup;
  tempIspit!: IspitGet;
  urlDokumenta?: string;

  constructor(private ispitService: IspitService, private fb: FormBuilder, private router: Router) { 
    this.addIspit = this.fb.group({
      naslov: new FormControl('', [Validators.required]),
      opis: new FormControl('', [Validators.required]),
      vrijemePocetka: new FormControl('', [Validators.required]),
      vrijemeZavrsetka: new FormControl('', [Validators.required]),
      organizacijaKursaId: new FormControl('', [Validators.required]),
      // urlDokumenta: new FormControl('', [Validators.required])
    });

    this.ispitService.GetOrganizacijeKurseva().subscribe(data => {
      this.organizacijeKurseva = data;
      console.log(this.organizacijeKurseva);
    });
  }
  
  ngOnInit(): void {
  }
  
  public examPath(){
    return this.urlDokumenta === null ? window.location.reload() : 'https://localhost:5001/' + this.urlDokumenta;
  }

  public uploadFinished = (event: any) => {
    this.response = event;
  }

  public validateControl = (controlName: string) => {
    return this.addIspit.controls[controlName].invalid && this.addIspit.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addIspit.controls[controlName].hasError(errorName);
  }

  public createIspit = (ispitFormValue: any) => {
    this.showError = false;
    const formValues = { ...ispitFormValue};

    const ispit: IspitDodaj = {
      naslov: formValues.naslov,
      opis: formValues.opis,
      urlDokumenta: this.response.dbPath,
      vrijemePocetka: formValues.vrijemePocetka,
      vrijemeZavrsetka: formValues.vrijemeZavrsetka,
      organizacijaKursaId: formValues.organizacijaKursaId
    };

    this.ispitService.CreateIspit(ispit).subscribe(_ => {
      window.location.reload();
    },
    error => {
      this.errorMessage = error;
      this.showError = true;
    })
   
  }

  public create() {
    
    this.addIspit = this.fb.group({
      naslov: '',
      opis: '',
      vrijemePocetka: '',
      vrijemeZavrsetka:'',
      organizacijaKursaId:''
    })
  }

  public updateIspit = (ispitFormValues: any) => {
    this.showError = false;
    const formValues = { ...ispitFormValues };

    let ispit: IspitDodaj = {
      id: formValues.id,
      naslov: formValues.naslov,
      opis: formValues.opis,
      vrijemePocetka: formValues.vrijemePocetka,
      vrijemeZavrsetka: formValues.vrijemeZavrsetka,
      organizacijaKursaId: formValues.organizacijaKursaId,
    }


    if(this.response != undefined){
      ispit.urlDokumenta = this.response.dbPath;
    }
    else{
      ispit.urlDokumenta = formValues.urlDokumenta;
    }

      this.ispitService.UpdateIspit(ispit).subscribe(_ => {
        window.location.reload();
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })

  }

  public uredi = (event: any) => {
    this.tempIspit = event;

    this.addIspit = this.fb.group({
      id: this.tempIspit.id,
      naslov: this.tempIspit.naslov,
      opis: this.tempIspit.opis,
      urlDokumenta: this.tempIspit.urlDokumenta,
      vrijemePocetka: this.tempIspit.vrijemePocetka,
      vrijemeZavrsetka: this.tempIspit.vrijemeZavrsetka,
      organizacijaKursaId: this.tempIspit.organizacijaKursaId
    })

    for(let i = 0; i < this.organizacijeKurseva.length; i++){
      if(this.addIspit.controls.organizacijaKursaId.value === this.organizacijeKurseva[i].value){
        this.addIspit.controls.organizacijaKursaId.patchValue(this.organizacijeKurseva[i].value);
      }
    }
    
    // this.urlDokumenta = this.addIspit.controls.urlDokumenta.value;
    this.urlDokumenta = this.tempIspit.urlDokumenta;
  }

  public modalBrisanje = (event: any) => {

    if(event.id !== undefined)
    {
      this.tempIspit = event;
    }
  }
  
  public izbrisi = () =>
  {
    if(this.tempIspit.id !== undefined)
    {
      this.ispitService.DeleteIspit(this.tempIspit.id).subscribe(_ => {      
        window.location.reload();
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })
    }
  }

}
