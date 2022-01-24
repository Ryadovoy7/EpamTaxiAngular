import { UserForRegistrationDto } from './userForRegistrationDto';
import { AuthenticationService } from './authentication.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-register-user',
    templateUrl: './register-user.component.html'
})
export class RegisterUserComponent implements OnInit {
    public registerForm: FormGroup;
    public errorMessage: string = '';
    public showError: boolean;

    private url = "api/account/register";
    private _baseUrl = "";

    constructor(private _authService: AuthenticationService, private _router: Router) {}

    ngOnInit(): void {
        this.registerForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required]),
            contactNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
        });
    }
    public validateControl = (controlName: string) => {
        return this.registerForm.controls[controlName].invalid && this.registerForm.controls[controlName].touched
    }
    public hasError = (controlName: string, errorName: string) => {
        return this.registerForm.controls[controlName].hasError(errorName)
    }
    public registerUser = (registerFormValue) => {
        this.showError = false;
        const formValues = { ...registerFormValue };
        const user: UserForRegistrationDto = {
            email: formValues.email,
            contactNumber: formValues.contactNumber,
            password: formValues.password
        };

        this._authService.registerUser(this.url, user)
            .subscribe(_ => {
                this._router.navigate(["/authentication/login"]);
            },
                error => {
                    this.errorMessage = error;
                    this.showError = true;
                })
    }
}