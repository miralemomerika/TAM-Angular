import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subscription, timer } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { IspitRad } from 'src/app/core/models/IspitRad';
import { IspitGet } from 'src/app/core/models/IspitGet';
import { IspitService } from 'src/app/core/services/ispit.service';

@Component({
  selector: 'app-student-ispit',
  templateUrl: './student-ispit.component.html',
  styleUrls: ['./student-ispit.component.css']
})
export class StudentIspitComponent implements OnInit, OnDestroy {

  @Input() intervalPeriod: number = 1;
  @Output() aktivniIspiti: any;
  @Output() zavrseniIspiti: any;
  numActiveExams!: number;
  numUnactiveExams!: number;
  minutes!: number;
  subscription!: Subscription;

  constructor(private router: Router, private ispitService: IspitService) {

    this.ispitService.GetAktivneIspitePolaznika().subscribe(data => {
      this.aktivniIspiti = data;
      if(this.aktivniIspiti != null || this.aktivniIspiti != undefined)
        this.numActiveExams = this.aktivniIspiti.length;
      else
        this.numActiveExams = 0;
    });


    this.ispitService.GetZavrseneIspitePolaznika().subscribe(data => {
      this.zavrseniIspiti = data;
      if(this.zavrseniIspiti != null || this.zavrseniIspiti != undefined)
      this.numUnactiveExams = this.zavrseniIspiti.length;
      else
      this.numUnactiveExams = 0;
    });

    

   }

  ngOnInit(): void {
    this.minutes = this.intervalPeriod * 20 * 1000;

    this.subscription = timer(0, this.minutes)
      .pipe(
        switchMap(() => {
          return this.ispitService.GetAktivneIspitePolaznika()
            .pipe(catchError(err => {
              console.log(err);
              return of(undefined);
            }));
        }),
        filter(data => data !== undefined)
      )
      .subscribe(data => {
        this.aktivniIspiti = data;
        //izbrisati
        console.log(this.aktivniIspiti);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  DetaljiAktivnih(ispit: IspitRad){
    this.router.navigate(['/ispit-detalji'], {state: {data: {ispit: ispit}}});
  }

  DetaljiZavrsenih(ispit: IspitRad){
    this.router.navigate(['/ispit-detalji'], {state: {data: {ispit: ispit}}});
  }

}
