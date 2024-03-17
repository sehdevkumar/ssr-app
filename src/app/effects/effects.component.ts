import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-effects',
  standalone: true,
  imports: [],
  templateUrl: './effects.component.html',
  styleUrl: './effects.component.scss'
})
export class EffectsComponent {

  mySignal = signal(null);

  constructor() {
    effect(()=> {
      console.log("What is use of Effects")
    })
  }

}
