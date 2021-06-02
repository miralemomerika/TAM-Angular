import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor( private authService: AuthenticationService, private router: Router ) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if(this.authService.isUserAuthenticated())
      return true;  

    this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } })
    return false;
  }

}
