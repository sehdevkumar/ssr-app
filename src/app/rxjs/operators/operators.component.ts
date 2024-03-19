import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component, OnInit, inject } from '@angular/core'
import {
  BehaviorSubject,
  Subject,
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

  constructor(private http: HttpClient) {}

  getData(param) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${param}`)
  }

  ngOnInit(): void {
    this.concatMapFun()
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
