import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { IspitDodaj } from '../models/IspitDodaj';
import { IspitGet } from '../models/IspitGet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class IspitService {

  constructor(private http: HttpClient) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }

  public GetAktivneIspite = (): Observable<IspitGet[]> => {
    return this.http.get<IspitGet[]>(this.createCompleteRoute('api/ispiti/getispiti', environment.urlAddress), httpOptions);
  }
  public GetNeaktivneIspite = (): Observable<IspitGet[]> => {
    return this.http.get<IspitGet[]>(this.createCompleteRoute('api/ispiti/getnaispiti', environment.urlAddress), httpOptions);
  }
  public CreateIspit = (ispit: IspitDodaj) => {
    return this.http.post(this.createCompleteRoute('api/ispiti/createispit', environment.urlAddress), ispit, httpOptions);
  }  
  public GetOrganizacijeKurseva = () : Observable<any[]> => {
    return this.http.get<any[]>(this.createCompleteRoute('api/ispiti/getorganizacije', environment.urlAddress), httpOptions);
  } 
  public UpdateIspit(ispit: any): Observable<any> {
    return this.http.put(this.createCompleteRoute('api/ispiti', environment.urlAddress), ispit, httpOptions);
  }
  public DeleteIspit(id: number): Observable<any> {
    return this.http.delete(this.createCompleteRoute('api/ispiti/' + id, environment.urlAddress), httpOptions);
  }
  public GetById(id: number): Observable<any> {
    return this.http.get(this.createCompleteRoute('api/ispiti/getbyid/' + id, environment.urlAddress), httpOptions);
  }
  public GetAktivneIspitePolaznika = (): Observable<IspitGet[]> => {
    return this.http.get<IspitGet[]>(this.createCompleteRoute('api/rad/getispitipolaznika', environment.urlAddress), httpOptions);
  }
  public GetZavrseneIspitePolaznika = (): Observable<IspitGet[]> => {
    return this.http.get<IspitGet[]>(this.createCompleteRoute('api/rad/getzavrseniispiti', environment.urlAddress), httpOptions);
  }
}
