import { Statistika } from './../models/Statistika';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatistikaService {

  controllerPath: string;
  constructor(private http: HttpClient) {
    this.controllerPath = 'api/statistika';
  }

  getStatistika(): Observable<Statistika>{
    return this.http.get<Statistika>(environment.urlAddress + this.controllerPath);
  }

}
