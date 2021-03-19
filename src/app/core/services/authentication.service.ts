import { Injectable } from '@angular/core';
import { UserRegistrationDto } from '../../_interfaces/user-registration-dto';
import { RegistrationResponseDto } from '../../_interfaces/registration-response-dto';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlServiceService } from './environment-url-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlServiceService) { }

  public registerUser = (route: string, body: UserRegistrationDto) => {

    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }
}
