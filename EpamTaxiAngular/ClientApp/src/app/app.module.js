var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ForbiddenComponent } from './authentication/forbidden.component';
import { ErrorHandlerService } from './error-handler.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
export function tokenGetter() {
    return localStorage.getItem("token");
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            NavMenuComponent,
            LoginMenuComponent,
            OrdersComponent,
        ],
        imports: [
            BrowserModule,
            HttpClientModule,
            FormsModule,
            RouterModule.forRoot([
                { path: '', component: OrdersComponent, canActivate: [AuthenticationGuard] },
                { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
                { path: 'forbidden', component: ForbiddenComponent },
            ]),
            JwtModule.forRoot({
                config: {
                    tokenGetter: tokenGetter,
                    whitelistedDomains: ["localhost:44376"],
                    blacklistedRoutes: []
                }
            })
        ],
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: ErrorHandlerService,
                multi: true
            }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map