import { MatFormFieldModule } from '@angular/material/form-field'
import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component, OnInit, inject } from '@angular/core'
import {
  BehaviorSubject,
  Subject,
  delay,
  interval,
  of,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs'
import { MatOptionModule } from '@angular/material/core'
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule
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
