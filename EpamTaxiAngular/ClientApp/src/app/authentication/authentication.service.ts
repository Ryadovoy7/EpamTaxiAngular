import { RegisterRequest } from './registerRequest'; 
import { RegisterResponse } from './registerResponse';
import { authRequest } from './authRequest';
import { authResponse } from './authResponse'
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _baseUrl = "";
    private _authChangeSub = new Subject<boolean>()
    public authChanged = this._authChangeSub.asObservable();

    constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _jwtHelper: JwtHelperService) {
        this._baseUrl = baseUrl;
    }
    public registerUser = (route: string, body: RegisterRequest) => {
        return this._http.post<RegisterResponse>(this.createCompleteRoute(route, this._baseUrl), body);
    }

    public login = (route: string, body: authRequest) => {
        return this._http.post<authResponse>(this.createCompleteRoute(route, this._baseUrl), body);
    }

    private createCompleteRoute = (route: string, baseUrl: string) => {
        return `${baseUrl}${route}`;
    }

    public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
        this._authChangeSub.next(isAuthenticated);
    }

    public logout = () => {
        localStorage.removeItem("token");
        this.sendAuthStateChangeNotification(false);
    }

    public isUserAuthenticated = (): boolean => {
        const token = localStorage.getItem("token");

        return token && !this._jwtHelper.isTokenExpired(token);
    }

    public isUserAdmin = (): boolean => {
        const token = localStorage.getItem("token");
        const decodedToken = this._jwtHelper.decodeToken(token);
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        return role === 'Administrator';
    }
}