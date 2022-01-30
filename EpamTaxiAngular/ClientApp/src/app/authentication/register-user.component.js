var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
let RegisterUserComponent = class RegisterUserComponent {
    constructor(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
        this.errorMessage = '';
        this.url = "api/account/register";
        this._baseUrl = "";
        this.validateControl = (controlName) => {
            return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched;
        };
        this.hasError = (controlName, errorName) => {
            return this.registerForm.controls[controlName].hasError(errorName);
        };
        this.registerUser = (registerFormValue) => {
            this.showError = false;
            const formValues = Object.assign({}, registerFormValue);
            const user = {
                email: formValues.email,
                contactNumber: formValues.contactNumber,
                password: formValues.password,
                admin: formValues.admin
            };
            this._authService.registerUser(this.url, user)
                .subscribe(_ => {
                this._router.navigate(["/authentication/login"]);
            }, error => {
                this.errorMessage = error;
                this.showError = true;
            });
        };
    }
    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            contactNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
            admin: new FormControl(false)
        });
    }
};
RegisterUserComponent = __decorate([
    Component({
        selector: 'app-register-user',
        templateUrl: './register-user.component.html'
    })
], RegisterUserComponent);
export { RegisterUserComponent };
//# sourceMappingURL=register-user.component.js.map