// custom-validators.ts
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValidators {
  static checkUsernameAvailability(control: FormControl): Observable<any> {
    // Simulate an asynchronous operation (e.g., HTTP request) to check if the username is available
    return new Observable((observer) => {
      setTimeout(() => {
        if (control.value === 'admin') {
          observer.next({ usernameExists: true });
        } else {
          observer.next(null); // No error, username is available
        }
        observer.complete();
      }, 1000); // Simulate 1 second delay
    });
  }
}
