import { Kurs } from './../models/Kurs';
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
export class KursService {

  controllerPath: string;
  constructor(private http: HttpClient) {
    this.controllerPath = 'api/kursevi';
  }

  getKurseve(): Observable<Kurs[]>{
    return this.http.get<Kurs[]>(environment.urlAddress + this.controllerPath, httpOptions);
  }

  getNajpopularnije(): Observable<Kurs[]>{
    return this.http.get<Kurs[]>(environment.urlAddress + this.controllerPath + '/najpopularniji', httpOptions);
  }
}
