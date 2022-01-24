var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
let AuthenticationService = class AuthenticationService {
    constructor(_http, baseUrl, _jwtHelper) {
        this._http = _http;
        this._jwtHelper = _jwtHelper;
        this._baseUrl = "";
        this._authChangeSub = new Subject();
        this.authChanged = this._authChangeSub.asObservable();
        this.registerUser = (route, body) => {
            return this._http.post(this.createCompleteRoute(route, this._baseUrl), body);
        };
        this.login = (route, body) => {
            return this._http.post(this.createCompleteRoute(route, this._baseUrl), body);
        };
        this.createCompleteRoute = (route, baseUrl) => {
            return `${baseUrl}${route}`;
        };
        this.sendAuthStateChangeNotification = (isAuthenticated) => {
            this._authChangeSub.next(isAuthenticated);
        };
        this.logout = () => {
            localStorage.removeItem("token");
            this.sendAuthStateChangeNotification(false);
        };
        this.isUserAuthenticated = () => {
            const token = localStorage.getItem("token");
            return token && !this._jwtHelper.isTokenExpired(token);
        };
        this.isUserAdmin = () => {
            const token = localStorage.getItem("token");
            const decodedToken = this._jwtHelper.decodeToken(token);
            const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            return role === 'Administrator';
        };
        this._baseUrl = baseUrl;
    }
};
AuthenticationService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject('BASE_URL'))
], AuthenticationService);
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map