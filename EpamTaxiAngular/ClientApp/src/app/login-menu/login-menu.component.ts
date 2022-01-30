import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-menu',
    templateUrl: './login-menu.component.html'
})
export class LoginMenuComponent implements OnInit {
    public isUserAuthenticated: boolean;

    constructor(private _authService: AuthenticationService, private _router: Router) { }
    ngOnInit(): void {
        this._authService.authChanged
            .subscribe(res => {
                this.isUserAuthenticated = res;
            })
    }

    public logout = () => {
        this._authService.logout();
        this._router.navigate(["/authentication/login"]);
    }
}
