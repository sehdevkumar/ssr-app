import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-child11',
  standalone: true,
  imports: [],
  templateUrl: './child11.component.html',
  styleUrl: './child11.component.scss'
})
export class Child11Component implements OnInit {

  checkDeduction = false;

  checkDeductionRef = inject(ChangeDetectorRef);

 ngOnInit() {
   setTimeout(()=> {
      this.checkDeduction = true;
      this.checkDeductionRef.markForCheck()
   },10000)
 }


}
