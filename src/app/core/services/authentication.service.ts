import { Injectable } from '@angular/core';
import { UserRegistrationDto } from '../../_interfaces/user-registration-dto';
import { HttpClient } from '@angular/common/http';
import { EnvironmentUrlServiceService } from './environment-url-service.service';
import { UserLogin } from 'src/app/_interfaces/user-login';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangedSub = new Subject<boolean>();
  public authChanged = this.authChangedSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlServiceService, private jwtHelper: JwtHelperService) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}${route}`;
  }

  public registerUser = (route: string, body: UserRegistrationDto) => {

    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public loginUser = (route: string, body: UserLogin) => {
    return this._http.post(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangedSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  public isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');

    if( typeof token === 'undefined' && this.jwtHelper.isTokenExpired(token))
      return false;
    else
      return true;
  }

}
