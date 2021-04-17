import { Prijava } from './../models/Prijava';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})

export class PrijavaService {

  controllerPath: string;
  constructor(private http: HttpClient) {
    this.controllerPath = 'api/prijave';
   }

  getPrijave(): Observable<Prijava[]>{
    return this.http.get<Prijava[]>(environment.urlAddress + this.controllerPath, httpOptions);
  }

  addPrijava(kursId: number): Observable<Prijava>{
    return this.http.post<Prijava>(environment.urlAddress + this.controllerPath, kursId, httpOptions);
  }
}
