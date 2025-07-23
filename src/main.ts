import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideAnimations(), ...(appConfig.providers || [])],
}).catch((err) => console.error(err));
