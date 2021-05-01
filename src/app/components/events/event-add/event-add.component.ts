import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DogadjajRequest } from '../../../core/models/DogadjajRequest';
import { DogadjajGet } from '../../../core/models/DogadjajGet';
import { DogadjajiService } from '../../../core/services/dogadjaji.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
  public dogadjaji!: DogadjajGet[];
  public errorMessage: string = '';
  public showError: boolean = false;
  public eventTypes: any = [];
  eventSelected: Number;
  addEventForm: FormGroup;
  isSubmitted=false;
  dogadjajTemp!: DogadjajGet;
  
  constructor(private _dogadjajiService: DogadjajiService, private fb: FormBuilder, private router: Router) { 
    this.addEventForm = this.fb.group({
      naziv: new FormControl('', [Validators.required]),
      datumIVrijemeOdrzavanja: new FormControl(''),
      tipDogadjajaId: new FormControl('', [Validators.required]),
      id: new FormControl(''),
      opis: new FormControl('', [Validators.required])
    })
    this.eventSelected=1;
    this._dogadjajiService.getTipDogadjajas().subscribe(data => 
      {
        this.eventTypes = data;
        this.addEventForm.controls.tipDogadjajaId.patchValue(this.eventTypes[0].Id);
      })
    this._dogadjajiService.getDogadjajeOrganizator().subscribe(data => 
      {
        this.dogadjaji=data;
      })
  }
  // addEventForm = this.fb.group(
  //   {
  //     naziv: new FormControl('', [Validators.required]),
  //       datumIVrijemeOdrzavanja: new FormControl(''),
  //       tipDogadjajaId: new FormControl('', [Validators.required])
  //   }
  // );
  ngOnInit(): void {
  }

  public validateControl = (controlName: string) => {
    return this.addEventForm.controls[controlName].invalid && this.addEventForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addEventForm.controls[controlName].hasError(errorName);
  }

  public addEvent = (addEventFormValue: any) =>
  { 
    this.showError=false;
    const formValues = { ...addEventFormValue};
    
    if(formValues.id=='')
    {
      const dogadjaj: DogadjajRequest = {
        naziv: formValues.naziv,
        datumIVrijemeOdrzavanja: formValues.datumIVrijemeOdrzavanja,
        tipDogadjajaId: formValues.tipDogadjajaId,
        opis:formValues.opis
      };
     
      this._dogadjajiService.createDogadjaj(dogadjaj)
      .subscribe(_ => {
        this.router.navigate(["/events"]);
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
        })
    }
    else
    {
      const dogadjaj: DogadjajRequest = {
        id: formValues.id,
        naziv: formValues.naziv,
        datumIVrijemeOdrzavanja: formValues.datumIVrijemeOdrzavanja,
        tipDogadjajaId: formValues.tipDogadjajaId,
        opis:formValues.opis
      };
      
      this._dogadjajiService.updateDogadjaj(dogadjaj)
      .subscribe(_ => {
          this.router.navigate(["/events"]);
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
        })
    }
  location.reload();      
  }
  
  public dodaj = ()=>
  {
    //ovo vidjeti
    let datum=new Date().toLocaleString();
    let datum2=new Date().toTimeString();
    let vrijeme=new Date().toLocaleTimeString();
    
    this.addEventForm = this.fb.group({
      naziv: '',
      datumIVrijemeOdrzavanja: '',
      tipDogadjajaId: '',
      id:'',
      opis:''
    })
  }
  
  public uredi = (dogadjaj: DogadjajGet)=>
  {
    let datumivrijeme;
    let day=dogadjaj.datumIVrijemeOdrzavanja?.substr(0,2);
    let month=dogadjaj.datumIVrijemeOdrzavanja?.substr(3,2);
    let year=dogadjaj.datumIVrijemeOdrzavanja?.substr(6,4);
    let hour=dogadjaj.datumIVrijemeOdrzavanja?.substr(12,2);
    let minutes=dogadjaj.datumIVrijemeOdrzavanja?.substr(15,2);   
    if(dogadjaj.datumIVrijemeOdrzavanja!==undefined)
    datumivrijeme=year+"-"+month+"-"+day+"T"+hour+":"+minutes;
    
    this.addEventForm = this.fb.group({
      naziv: dogadjaj.naziv,
      datumIVrijemeOdrzavanja: datumivrijeme,
      tipDogadjajaId: dogadjaj.tipDogadjaja,
      id:dogadjaj.id,
      opis: dogadjaj.opis 
    })
    
  }
  public modalBrisanje = (dogadjaj:DogadjajGet)=>
  {
    if(dogadjaj.id!==undefined)
    {
      this.dogadjajTemp=dogadjaj;
    }
  }
  public izbrisi = () =>
  {
    if(this.dogadjajTemp.id!==undefined)
    {
      this._dogadjajiService.deleteDogadjaj(this.dogadjajTemp.id).subscribe(_ => {      
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })
      window.location.reload();
    }
  }
}
