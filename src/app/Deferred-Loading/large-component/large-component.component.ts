import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Component, OnInit, inject, signal } from '@angular/core'
import { catchError, concatMap, of, throwError } from 'rxjs'

@Component({
  selector: 'app-large-component',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './large-component.component.html',
  styleUrl: './large-component.component.scss',
})
export class LargeComponentComponent implements OnInit {
  httpService = inject(HttpClient)

  apiResponse = signal(null)

  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.httpService
      .get('fake')
      .pipe(
        catchError((error) => {
          return of(error)
        })
      )
      .subscribe((res) => {
        this.apiResponse = res
        throw new Error('hhh')
      })
  }
}
