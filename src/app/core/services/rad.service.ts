import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { RadDodaj } from '../../core/models/RadDodaj';
import { RadOcijeni } from '../models/RadOcijeni';
import { RadGet } from '../models/RadGet';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class RadService {

  constructor(private http: HttpClient) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }

  public PostaviRad = (rad: RadDodaj) => {
    return this.http.post(this.createCompleteRoute('api/rad/dodajrad', environment.urlAddress), rad, httpOptions);
  }
  public GetRadoveIspita = (id: number): Observable<RadGet[]> => {
    return this.http.get<RadGet[]>(this.createCompleteRoute('api/rad/getradoveispita/'+id, environment.urlAddress), httpOptions);
  }
  public OcijeniRad = (rad: RadOcijeni) => {
    return this.http.post(this.createCompleteRoute('api/rad/ocijenirad', environment.urlAddress), rad, httpOptions);
  }
}
