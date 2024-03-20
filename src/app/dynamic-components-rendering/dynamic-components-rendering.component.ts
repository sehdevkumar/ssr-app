import { CommonModule } from '@angular/common'
import { Component, ViewContainerRef } from '@angular/core'

/**
 * @fileoverview Example 1
 *! It is example for the render an angular component using the ngComponentOutlet directive which the part of the dynamic component rending...
 */
@Component({
  selector: 'app-dummy-component',
  standalone: true,
  template: `
    <div>
      I am not Mad Ok , So do not fool me again .....
    </div>
  `,
})
export class AppDummyComponet {}

// ! Example2 , How to use the viewContainerRef to create and component and redner it next to sibling component , just look the code ok.

@Component({
  selector: 'app-child-component',
  standalone: true,
  template: `
    <div>
      This is Child component
    </div>
  `,
})
export class AppChildComponent {}
@Component({
  selector: 'app-container-viewref-component',
  imports: [CommonModule, AppChildComponent],
  template: `
    <button class="w-[200px] h-[20px] bg-green-400" (click)="loadComponent()">
      Load Component
    </button>
  `,
  standalone: true,
})
export class AppContainerViewRefComponent {
  constructor(private containerRef: ViewContainerRef) {}

  loadComponent() {
    this.containerRef.createComponent(AppChildComponent)
  }
}

@Component({
  selector: 'app-dynamic-components-rendering',
  standalone: true,
  imports: [CommonModule, AppDummyComponet, AppContainerViewRefComponent],
  template: `
    <ng-container *ngComponentOutlet="appDummyComponet()"></ng-container>
    <app-container-viewref-component></app-container-viewref-component>
  `,
})
export class DynamicComponentsRenderingComponent {
  appDummyComponet() {
    return AppDummyComponet
  }
}

