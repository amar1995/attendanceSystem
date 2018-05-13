import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authService/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // console.log(route);
    if (!this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // console.log(route);
    if (!this.authService.isTokenExpired()) {
      this.router.navigate(['/edit']);
      return false;
    }

    // this.router.navigate(['/profile']);
    return true;
  }
}


@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // console.log(route);
    if (!this.authService.isTokenExpired() && this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/profile']);
    return true;
  }
}
