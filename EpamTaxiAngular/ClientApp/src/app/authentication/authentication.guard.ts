import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
    constructor(private _authService: AuthenticationService, private _router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._authService.isUserAuthenticated()) {
            return true;
        }
        this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
  
}
