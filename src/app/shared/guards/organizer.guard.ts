import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../core/services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class OrganizerGuard implements CanActivate {
  
  constructor(private _authService: AuthenticationService, private _router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._authService.isUserOrganizer())
      return true;
    this._router.navigate(['/home']);
    return false;
  }

  
}
