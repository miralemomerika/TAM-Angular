import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../../_interfaces/user-login';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorMessage: string = '';
  public showError: boolean = false;
  private returnUrl: string = '';

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthenticationService, 
              private router: Router, 
              private route: ActivatedRoute, 
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      this.router.navigate([this.returnUrl]);
    },
    (error) => {
      this.errorMessage = error;
      this.showError = true;
    })
  }

}
