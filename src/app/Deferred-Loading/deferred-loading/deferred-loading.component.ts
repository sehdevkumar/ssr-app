import { Component } from '@angular/core';
import { LargeComponentComponent } from '../large-component/large-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deferred-loading',
  standalone: true,
  imports: [LargeComponentComponent,CommonModule],
  templateUrl: './deferred-loading.component.html',
  styleUrl: './deferred-loading.component.scss'
})
export class DeferredLoadingComponent {

}
