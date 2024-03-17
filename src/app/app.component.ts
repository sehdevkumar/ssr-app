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
import { MainService } from './Providers-Injections/main.service';
import { DummyService } from './Providers-Injections/dummy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncSyncValidatorsComponent,UpdateFormValuesComponent,DynamicControlsFormComponent,ParentComponent, ImageOverlayComponent,DeferredLoadingComponent,EffectsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // How Injection Token Works
  providers:[{
    provide:MainService,
    useValue: 'sehdev'
  }]
})
export class AppComponent {
  title = 'ssr-app';

  ms = inject(MainService);
  ds = inject(DummyService);



  constructor() {

    console.log(this.ms)

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
