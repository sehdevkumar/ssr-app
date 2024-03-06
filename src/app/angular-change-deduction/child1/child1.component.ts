import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Child11Component } from '../child11/child11.component';

@Component({
  selector: 'app-child1',
  standalone: true,
  imports: [Child11Component],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Child1Component implements OnInit {

  checkDeduction = false;

  checkDeductionRef = inject(ChangeDetectorRef);

 ngOnInit() {
   setTimeout(()=> {
      this.checkDeduction = true;
      this.checkDeductionRef.markForCheck()
   },10000)
 }


}
