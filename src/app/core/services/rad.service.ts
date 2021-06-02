import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { RadDodaj } from '../../core/models/RadDodaj';

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
}
