import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  public showSuccess: boolean = false;
  public showError: boolean = false;
  public errorMessage: string = "";

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.confirmEmail();
  }
  confirmEmail = () => {
    this.showError = this.showError = false;

    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    console.log(token);

    this.authService.confirmEmail('api/accounts/emailconfirmation', token, email)
    .subscribe(_ => {
      this.showSuccess = true;
    },
    error => {
      this.showError = true;
      this.errorMessage = error;
    })
  }

}
