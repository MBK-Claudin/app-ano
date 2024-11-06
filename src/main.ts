import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpQHxbf1x0ZFBMYVhbRnJPIiBoS35RckRiWXpfd3VcRWldV0B2');

if (environment){
  enableProdMode();
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
