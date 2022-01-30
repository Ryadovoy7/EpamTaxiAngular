var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
let ErrorHandlerService = class ErrorHandlerService {
    constructor(_router) {
        this._router = _router;
        this.handleError = (error) => {
            if (error.status === 404) {
                return this.handleNotFound(error);
            }
            else if (error.status === 400) {
                return this.handleBadRequest(error);
            }
            else if (error.status === 401) {
                return this.handleUnauthorized(error);
            }
            else if (error.status === 403) {
                return this.handleForbidden(error);
            }
        };
        this.handleNotFound = (error) => {
            this._router.navigate(['/404']);
            return error.message;
        };
        this.handleBadRequest = (error) => {
            if (this._router.url === '/authentication/register' || this._router.url === '/') {
                let message = '';
                const values = Object.values(error.error.errors);
                values.map((m) => {
                    message += m + '<br>';
                });
                return message.slice(0, -4);
            }
            else {
                return error.error ? error.error : error.message;
            }
        };
        this.handleUnauthorized = (error) => {
            if (this._router.url === '/authentication/login') {
                return 'Аутентификация провалена. Неверная электронная почта или пароль';
            }
            else {
                this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: this._router.url } });
                return error.message;
            }
        };
        this.handleForbidden = (error) => {
            this._router.navigate(["/forbidden"], { queryParams: { returnUrl: this._router.url } });
            return "Нет доступа";
        };
    }
    intercept(req, next) {
        return next.handle(req)
            .pipe(catchError((error) => {
            let errorMessage = this.handleError(error);
            return throwError(errorMessage);
        }));
    }
};
ErrorHandlerService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ErrorHandlerService);
export { ErrorHandlerService };
//# sourceMappingURL=error-handler.service.js.map