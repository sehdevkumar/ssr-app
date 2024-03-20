import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component, OnInit, afterRender, inject } from '@angular/core'
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  concatMap,
  delay,
  from,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs'
import { MatOptionModule } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'

/**
 * @fileoverview
 *
 * To delve into a more extensive list of commonly used RxJS operators, you can explore the following operators:

1. **map**: Transforms each value emitted by the Observable.
2. **filter**: Filters the values emitted by the Observable based on a predicate.
3. **merge**: Merges multiple Observables into one.
4. **combineLatest**: Combines the latest values from multiple Observables.
5. **switchMap**: Projects each source value to an Observable, then flattens these into a single Observable.
6. **concat**: Concatenates multiple Observables together by sequentially emitting their values.
7. **take**: Emits only the first `n` values emitted by an Observable.
8. **debounceTime**: Emits a value from the source Observable only after a specified time has passed without another source emission.
9. **distinctUntilChanged**: Emits all values emitted by the source Observable that are distinct from the previous value.
10. **scan**: Applies an accumulator function over the source Observable, emitting each intermediate result.
11. **startWith**: Emits a specified value as the first emission before the source Observable begins emitting.
12. **pluck**: Selects a specific property from each source value.
13. **retry**: Re-subscribes to the source Observable a specified number of times if an error occurs.
14. **catchError**: Handles errors in the source Observable by returning a new Observable or throwing an error.
15. **tap**: Intercepts each emission on the source Observable for side effects.
16. **finalize**: Invokes a specified function when the source Observable completes or errors.
17. **distinctUntilKeyChanged**: Emits all values emitted by the source Observable that are distinct based on a specific key.
18. **takeUntil**: Emits values from the source Observable until a second Observable emits.
19. **delay**: Delays the emissions from the source Observable by a specified amount of time.
20. **shareReplay**: Shares a single subscription to the source Observable and replays a specified number of emissions to subsequent subscribers.

These operators are commonly used in RxJS programming to manipulate, filter, combine, and control the flow of data streams effectively.
 *
 */
@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.scss',
})
export class OperatorsComponent implements OnInit {
  posts: any
  sub: BehaviorSubject<any> = new BehaviorSubject('')

  constructor(private http: HttpClient) {
    afterRender(() => {
      this.combineLatestFun()
    })
  }

  getData(param) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${param}`)
  }

  ngOnInit(): void {}

  // ===============================CombineLatest==========================================

  combineLatestFun() {
    const obs1 = timer(5000).pipe(map(() => 'I am main'))
    const obs2 = interval(600).pipe(map(() => Math.random()),delay(2000))

    combineLatest([obs1, obs2]).subscribe((res) => {
      // console.log(res)
    })
  }

  // ============================ConcatMap====================================
  // ! concatMap use to concat the nested sunscriptions but do  have the  order in which values emitted.
  concatMapFun() {
    from([1, 2, 3, 4, 5])
      .pipe(concatMap((id) => this.getData(id)))
      .subscribe((res) => {
        console.log(res)
      })
  }

  // ============================MergeMap====================================
  // ! mergeMap use to merge the nested sunscriptions but do not have the  order in which values emitted.
  mergeMapFun() {
    from([1, 2, 3, 4, 5])
      .pipe(mergeMap((id) => this.getData(id)))
      .subscribe((res) => {
        console.log(res)
      })
  }

  // ============================SwitchMap======================================
  //  ? switchMap use to cancel the most recent emitted value and subscribe to the last
  switchMapFun() {
    this.sub.pipe(switchMap((id) => this.getData(id))).subscribe((res) => {
      this.posts = res
    })
  }

  onOptionSelect(event: any) {
    const id = event?.value

    timer(100).subscribe(() => {
      this.sub.next(id)
    })
  }
}
