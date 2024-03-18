import { Component, inject } from '@angular/core';
import { MainService } from '../main.service';
import { ExperimentsService } from '../experiments.service';

@Component({
  selector: 'app-injections-tester',
  standalone: true,
  imports: [],
  templateUrl: './injections-tester.component.html',
  styleUrl: './injections-tester.component.scss',
  providers:[{
    provide: MainService,
    useClass: ExperimentsService,
  }]
})
export class InjectionsTesterComponent {


    // useClass / useValue / useExisting
    ms = inject(MainService);
    es = inject(ExperimentsService);

    constructor() {
      // is ms and es has same instance ? true, false
      console.log(this.ms === this.es);

      // What will be the output of MainService ?
      // Will it point to ExperimentsService
      console.log(this.ms);


    }

}
