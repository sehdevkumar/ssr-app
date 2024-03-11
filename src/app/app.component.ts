import { config } from './app.config.server';
import { DynamicControlsFormComponent } from './dynamic-controls-form/dynamic-controls-form.component';
import { Component, afterRender } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncSyncValidatorsComponent } from './async-sync-validators/async-sync-validators.component';
import { UpdateFormValuesComponent } from './update-form-values/update-form-values.component';
import { ParentComponent } from './angular-change-deduction/parent/parent.component';
import {ImageOverlayComponent} from './image-overlay/image-overlay.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncSyncValidatorsComponent,UpdateFormValuesComponent,DynamicControlsFormComponent,ParentComponent, ImageOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ssr-app';

  constructor() {

     afterRender(async ()=> {
       localStorage.getItem('ssr-subscribe');
     })
  }
}
