import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit {
    isExpanded = false;
    public isUserAuthenticated: boolean;

    constructor(private _authService: AuthenticationService) { }
    ngOnInit(): void {
        this._authService.authChanged
            .subscribe(res => {
                this.isUserAuthenticated = res;
            })
    }
    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
}
