import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

const serverConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideServerRendering(),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
