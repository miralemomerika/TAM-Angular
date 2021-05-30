import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TAM';
  constructor(private _authService: AuthenticationService){
    if(this._authService.isUserAuthenticated())
      this._authService.sendAuthStateChangeNotification(true);
    if(this._authService.isUserOrganizer())
      this._authService.sendOrganizerChangeNotification(true);
  }
}
