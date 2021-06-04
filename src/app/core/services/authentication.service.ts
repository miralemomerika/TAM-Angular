import { Injectable } from '@angular/core';
import { UserRegistrationDto } from '../../_interfaces/user-registration-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EnvironmentUrlServiceService } from './environment-url-service.service';
import { UserLogin } from 'src/app/_interfaces/user-login';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomEncoder } from 'src/app/shared/custom-encoder';
import { SharedDataService } from './shared-data.service';
import { Router } from "@angular/router"
import { not } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangedSub = new Subject<boolean>();
  public authChanged = this.authChangedSub.asObservable();

  private organizerChangedSub = new Subject<boolean>();
  private studentChangedSub = new Subject<boolean>();
  private teacherChangedSub = new Subject<boolean>();
  public organizerChanged = this.organizerChangedSub.asObservable();
  public studentChanged = this.studentChangedSub.asObservable();
  public teacherChanged = this.teacherChangedSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlServiceService, private jwtHelper: JwtHelperService, private sharedData: SharedDataService, private router: Router) { }

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

  public sendOrganizerChangeNotification = (isUserOrganizer : boolean) => {
    this.organizerChangedSub.next(isUserOrganizer);
  }

  public sendStudentChangeNotification = (isUserStudent : boolean) => {
    this.studentChangedSub.next(isUserStudent);
  }

  public sendTeacherChangeNotification = (isUserTeacher : boolean) => {
    this.teacherChangedSub.next(isUserTeacher);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
    this.sendOrganizerChangeNotification(false);
    this.sendStudentChangeNotification(false);
    this.sendTeacherChangeNotification(false);
    this.sharedData.promijeniBroj(null);
    this.router.navigate(['/home']);
  }

  public isUserAuthenticated = (): boolean => {

    const token: any = localStorage.getItem('token') != null ? localStorage.getItem('token') : undefined;
    if( typeof token === 'undefined' || this.jwtHelper.isTokenExpired(token))
      return false;
    else
      return true;

  }
  public isUserOrganizer = (): boolean => {
    const token = localStorage.getItem("token");
    if(token != null)
    {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role == 'Organizator';
    }
    return false;
  }

  public isUserStudent = (): boolean => {
    const token = localStorage.getItem("token");
    if(token != null)
    {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role == 'Polaznik';
    }
    return false;
  }

  public isUserTeacher = (): boolean => {
    const token = localStorage.getItem("token");
    if(token != null)
    {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      return role == 'Predavac';
    }
    return false;
  }

  public confirmEmail = (route: string, token: string, email: string) => {

    let params = new HttpParams({encoder: new CustomEncoder() })
    params = params.append('token', token);
    params = params.append('email', email);

    return this._http.get(this.createCompleteRoute(route, this._envUrl.urlAddress), { params: params });
  }

  public getData = (route: string): Observable<any> => {
    return this._http.get(this.createCompleteRoute(route, this._envUrl.urlAddress));
  }

}
