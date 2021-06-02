import { RecenzijaService } from './../../services/recenzija.service';
import { SharedDataService } from './../../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../_interfaces/user-login';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string = '';
  public showError: boolean = false;
  private returnUrl: string = '';
  brojAktivnihRecenzija!: number | null;

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              public fb: FormBuilder,
              private sharedData: SharedDataService,
              private http: HttpClient,
              private recenzijaService: RecenzijaService,
              private jwtHelper:JwtHelperService) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.sharedData.trenutniBroj.subscribe(broj => this.brojAktivnihRecenzija = broj);
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public loginUser = (loginFormValue: any) => {

    this.showError = false;
    const login =  {...loginFormValue };
    const userForLogin: UserLogin = {
      email: login.email,
      password: login.password
    }

    this.authService.loginUser('api/accounts/login', userForLogin)
    .subscribe((res: any) => {
      localStorage.setItem("token", res.token);
      this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
      let isUserOrganizer:boolean = false;
      const decodedToken = this.jwtHelper.decodeToken(res.token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      if(role==='Organizator')
       isUserOrganizer=true;
      this.authService.sendOrganizerChangeNotification(isUserOrganizer);
      this.router.navigate([this.returnUrl]);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${res.token}`
        })
      };
      this.http.get<number | null>(environment.urlAddress + 'api/recenzije' + '/brojaktivnih',
      httpOptions).subscribe(x => this.sharedData.promijeniBroj(x));
      },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    });
  }

}
