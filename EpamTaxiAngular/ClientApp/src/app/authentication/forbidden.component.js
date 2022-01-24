var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
let ForbiddenComponent = class ForbiddenComponent {
    constructor(_router, _route) {
        this._router = _router;
        this._route = _route;
        this.navigateToLogin = () => {
            this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: this._returnUrl } });
        };
    }
    ngOnInit() {
        this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }
};
ForbiddenComponent = __decorate([
    Component({
        selector: 'app-forbidden',
        templateUrl: './forbidden.component.html'
    })
], ForbiddenComponent);
export { ForbiddenComponent };
//# sourceMappingURL=forbidden.component.js.map