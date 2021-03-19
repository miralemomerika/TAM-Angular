import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlServiceService {

  public urlAddress: string = environment.urlAddress;
  constructor() { }
}
