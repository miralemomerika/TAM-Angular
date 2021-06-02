import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private brojAktivnihRecenzijaSource = new BehaviorSubject<number | null>(null);
  trenutniBroj = this.brojAktivnihRecenzijaSource.asObservable();

  constructor() { }

  promijeniBroj(novi: number | null): void
  {
    this.brojAktivnihRecenzijaSource.next(novi);
  }
}
