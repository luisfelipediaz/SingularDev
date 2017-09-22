import { Injectable } from '@angular/core';

@Injectable()
export class CommonProvider {

  constructor() {
  }

  numberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
