import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageManagerService {

  getData(key: string): string {
    if (window.localStorage)
      return localStorage.getItem(key);
    else
      console.error("local storage inaccessible!");
  }

  setData(key: string, value: string): void {
    if (window.localStorage)
      localStorage.setItem(key, value);
    else
      console.error("local storage inaccessible!");

  }

  onInit(key: string, value: string): string {
    if (window.localStorage) {
      if (localStorage.length > 0) {
        if (localStorage.getItem(key))
          return this.getData(key);
        else
          this.setData(key, value);
      }
    }
    return '';
  }
}


