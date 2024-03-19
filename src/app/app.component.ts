import { config } from './app.config.server';
import { DynamicControlsFormComponent } from './dynamic-controls-form/dynamic-controls-form.component';
import { Component, afterRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncSyncValidatorsComponent } from './async-sync-validators/async-sync-validators.component';
import { UpdateFormValuesComponent } from './update-form-values/update-form-values.component';
import { ParentComponent } from './angular-change-deduction/parent/parent.component';
import {ImageOverlayComponent} from './image-overlay/image-overlay.component'
import { DeferredLoadingComponent } from './Deferred-Loading/deferred-loading/deferred-loading.component';
import { EffectsComponent } from './effects/effects.component';
import { InjectionsTesterComponent } from './Providers-injection-Topics/injections-tester/injections-tester.component';
import { OperatorsComponent } from './rxjs/operators/operators.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncSyncValidatorsComponent,UpdateFormValuesComponent,DynamicControlsFormComponent,ParentComponent, ImageOverlayComponent,DeferredLoadingComponent,EffectsComponent,
  InjectionsTesterComponent,OperatorsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ssr-app';


  constructor() {

  }
}

if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./app.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}
