import { authRequest } from './authRequest';
import { AuthenticationService } from './authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-login-user',
    templateUrl: './login-user.component.html'
})
export class LoginUserComponent implements OnInit {
    public loginForm: FormGroup;
    public errorMessage: string = '';
    public showError: boolean;
    private _returnUrl: string;
    private _baseUrl: string;
    private url: string = 'api/account/login'
    constructor(private _router: Router, private _route: ActivatedRoute, private _authService: AuthenticationService) { }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl("", [Validators.required]),
            password: new FormControl("", [Validators.required])
        })
        this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }
    public validateControl = (controlName: string) => {
        return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.loginForm.controls[controlName].hasError(errorName)
    }
    public loginUser = (loginFormValue) => {
        this.showError = false;
        const login = { ...loginFormValue };
        const userForAuth: authRequest = {
            email: login.username,
            password: login.password
        }
        this._authService.login(this.url, userForAuth)
            .subscribe(res => {
                localStorage.setItem("token", res.token);
                this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
                this._router.navigate([this._returnUrl]);
            },
                (error) => {
                    this.errorMessage = error;
                    this.showError = true;
                })
    }
}




