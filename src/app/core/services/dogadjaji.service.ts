import { DogadjajGet } from './../models/DogadjajGet';
import { DogadjajRequest } from './../models/DogadjajRequest';

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
export class DogadjajiService {
  controllerPath: string;
  constructor(private http: HttpClient) {
    this.controllerPath = 'api/dogadjaj';
  }
  getDogadjajeOrganizator(): Observable<DogadjajGet[]>{
    return this.http.get<DogadjajGet[]>(environment.urlAddress + 'api/dogadjaj/o', httpOptions);
  }
  getDogadjaje(): Observable<DogadjajGet[]>{
    return this.http.get<DogadjajGet[]>(environment.urlAddress + this.controllerPath, httpOptions);
  }
  getTipDogadjajas(): Observable<DogadjajRequest[]>{
    return this.http.get<DogadjajRequest[]>(environment.urlAddress + 'api/dogadjaj/tip', httpOptions);
  }
  createDogadjaj(dogadjaj:any): Observable<any>
  {
    return this.http.post(environment.urlAddress + this.controllerPath, dogadjaj, httpOptions);
  }
  getDogadjajById(id:number): Observable<DogadjajGet>{
    return this.http.get(environment+this.controllerPath+"/"+id, httpOptions);
  }
  updateDogadjaj(dogadjaj:any): Observable<any>
  {
    return this.http.put(environment.urlAddress+this.controllerPath, dogadjaj, httpOptions);
  }
  deleteDogadjaj(id:number):Observable<any>
  {
    return this.http.delete(environment.urlAddress+this.controllerPath+"/"+id, httpOptions);
  }
}
