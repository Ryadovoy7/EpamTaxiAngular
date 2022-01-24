import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
const providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];
enableProdMode();
const platform = platformBrowserDynamic(providers);
platform.bootstrapModule(AppModule);
//# sourceMappingURL=main.js.map