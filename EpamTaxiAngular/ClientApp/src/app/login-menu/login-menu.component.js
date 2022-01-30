var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
let LoginMenuComponent = class LoginMenuComponent {
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.logout = () => {
            this._authService.logout();
            this._router.navigate(["/authentication/login"]);
        };
    }
    ngOnInit() {
        this._authService.authChanged
            .subscribe(res => {
            this.isUserAuthenticated = res;
        });
    }
};
LoginMenuComponent = __decorate([
    Component({
        selector: 'app-login-menu',
        templateUrl: './login-menu.component.html'
    })
], LoginMenuComponent);
export { LoginMenuComponent };
//# sourceMappingURL=login-menu.component.js.map