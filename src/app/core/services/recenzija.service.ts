import { AktivneRecenzije } from './../models/AktivneRecenzije';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class RecenzijaService {

  controllerPath: string;
  constructor(private http: HttpClient) {
    this.controllerPath = 'api/recenzije';
  }

  getAktivneRecenzije(): Observable<AktivneRecenzije[]>{
    return this.http.get<AktivneRecenzije[]>(environment.urlAddress + this.controllerPath, httpOptions);
  }
}
