import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterUserComponent } from './register-user.component';
import { LoginUserComponent } from './login-user.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [RegisterUserComponent, LoginUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
        { path: 'register', component: RegisterUserComponent },
        { path: 'login', component: LoginUserComponent }
    ])
  ]
})
export class AuthenticationModule { }