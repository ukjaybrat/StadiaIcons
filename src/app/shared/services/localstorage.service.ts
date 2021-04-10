import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class LocalStorageService {
  [key:string]: any;

  /**
   * define your localstorage variables here as observables
   */
  id_token$ = new Subject();
  redirect_url$ = new Subject();
  profile$ = new Subject();
  customer$ = new Subject();

  set(key: string, value: any) {
    this[key + '$'].next(value); // this will make sure to tell every subscriber about the change.
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  remove(key: string) {
    this[key + '$'].next(undefined);
    localStorage.removeItem(key);
  }
}