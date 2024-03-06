import { Component } from '@angular/core';
import { Child21Component } from '../child21/child21.component';

@Component({
  selector: 'app-child2',
  standalone: true,
  imports: [Child21Component],
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.scss'
})
export class Child2Component {

}
