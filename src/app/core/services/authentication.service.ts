import { Injectable } from '@angular/core';
import { UserRegistrationDto } from '../../_interfaces/user-registration-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentUrlServiceService } from './environment-url-service.service';
import { UserLogin } from 'src/app/_interfaces/user-login';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomEncoder } from 'src/app/shared/custom-encoder';

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

  public confimEmail = (route: string, token: string, email: string) => {

    let params = new HttpParams({encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this._http.get(this.createCompleteRoute(route, this._envUrl.urlAddress), { params: params });
  }

}
