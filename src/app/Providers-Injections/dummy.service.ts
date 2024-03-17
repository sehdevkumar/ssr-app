import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor() {

    console.log("I am from the dummy world..")

  }
}
