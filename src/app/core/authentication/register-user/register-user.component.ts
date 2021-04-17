import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserRegistrationDto } from '../../../_interfaces/user-registration-dto';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {

  public errorMessage: string = '';
  public showError: boolean = false;
  public roles: any = [];
  public studentTypes: any = [];
  registerForm: FormGroup;
  isOrganizator: boolean = false;
  isPolaznik: boolean = false;
  @ViewChild("role") role?: ElementRef;

  constructor( private _authService: AuthenticationService, private fb: FormBuilder, private router: Router) { 
    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(''),
      role: new FormControl('', [Validators.required]),
      institution: new FormControl('', [Validators.nullValidator]),
      studentType: new FormControl('', [Validators.nullValidator]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('')
    })

    this._authService.getData("api/accounts/roles").subscribe(data => {
      this.roles = data;
      this.registerForm.controls.role.patchValue(this.roles[0].Id);
    });

    this._authService.getData("api/accounts/getstudenttype").subscribe(data => {
      this.studentTypes = data;
      this.registerForm.controls.studentType.patchValue(this.studentTypes[0].Id);
    });
      
   }

  ngOnInit(): void { }

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
      clientURI: 'http://localhost:4200/authentication/emailconfirmation',
      role: formValues.role,
      studentType: formValues.studentType,
      institution: formValues.institution,
    };

    this._authService.registerUser('api/accounts/registration', user)
    .subscribe(_ => {
        this.router.navigate(["/authentication/login"]);
      },
      error => {
        this.errorMessage = error;
        this.showError = true;
      })
    // console.log(JSON.stringify(this.registerForm.value));
  }  

  public onRoleSelect = () => {
    this.roles.forEach((item: any) => {
      if( this.role?.nativeElement.value === item.id){
        // rola postoji
        this.changeRegisterForm(item.name);
      }
    });
  }

  public changeRegisterForm = (value: string) => {
    if(value === "Polaznik")
      return [this.isPolaznik = true, this.isOrganizator = false, this.registerForm.controls.institution.reset()];
    else
      return [this.isPolaznik = false, this.isOrganizator = true, this.registerForm.controls.studentType.reset()];
  }

}
