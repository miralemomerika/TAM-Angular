import { Component, OnInit } from '@angular/core';
import { UserRegistrationDto } from '../../../_interfaces/user-registration-dto';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {

  public errorMessage: string = '';
  public showError: boolean = false;

  registerForm = this.fb.group({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl(''),

  });

  constructor( private _authService: AuthenticationService, public fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {}

  public validateControl = (controlName: string) => {
    return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  public registerUser = (registerFormValue: any) => {
    this.showError = false;
    const formValues = { ...registerFormValue };

    const user: UserRegistrationDto = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phoneNumber: formValues.phoneNumber,
      password: formValues.password,
      confirmPassword: formValues.confirm,
    };

    this._authService.registerUser('api/accounts/registration', user)
    .subscribe(_ => {
        this.router.navigate(["/authentication/login"]);
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })
  }

}
