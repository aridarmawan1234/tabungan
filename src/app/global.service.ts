import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  dark: boolean
  constructor() { }

  setTheme(value){
    this.dark = value;
  }
  getTheme(){
    return this.dark;
  }
}
