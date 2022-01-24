var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let LoginUserComponent = class LoginUserComponent {
    constructor(_router, _route, _authService) {
        this._router = _router;
        this._route = _route;
        this._authService = _authService;
        this.errorMessage = '';
        this.url = 'api/account/login';
        this.validateControl = (controlName) => {
            return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched;
        };
        this.hasError = (controlName, errorName) => {
            return this.loginForm.controls[controlName].hasError(errorName);
        };
        this.loginUser = (loginFormValue) => {
            this.showError = false;
            const login = Object.assign({}, loginFormValue);
            const userForAuth = {
                email: login.username,
                password: login.password
            };
            this._authService.login(this.url, userForAuth)
                .subscribe(res => {
                localStorage.setItem("token", res.token);
                this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
                this._router.navigate([this._returnUrl]);
            }, (error) => {
                this.errorMessage = error;
                this.showError = true;
            });
        };
    }
    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required])
        });
        this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }
};
LoginUserComponent = __decorate([
    Component({
        selector: 'app-login-user',
        templateUrl: './login-user.component.html'
    })
], LoginUserComponent);
export { LoginUserComponent };
//# sourceMappingURL=login-user.component.js.map