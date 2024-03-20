import { Component, HostBinding, HostListener } from '@angular/core'

@Component({
  selector: 'app-host-element-bindings',
  standalone: true,
  imports: [],
  templateUrl: './host-element-bindings.component.html',
  styleUrl: './host-element-bindings.component.scss',
  host: {
    '[class.no-ptr]': 'isDisabled ? true : false',
  },
})
export class HostElementBindingsComponent {
  @HostBinding('class.no-ptr')
  isDisabled = false

  @HostListener('click', ['$event'])
  onMouseClick(event: MouseEvent) {
    console.log('Event Fires',event)
  }
}
