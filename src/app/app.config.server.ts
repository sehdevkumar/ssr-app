import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient, withFetch } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideServerRendering(),
    provideHttpClient(withFetch())
,
     { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} }
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
