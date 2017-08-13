import { Component } from '@angular/core';

/**
 * Generated class for the SupermarketCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'supermarket-card',
  templateUrl: 'supermarket-card.html'
})
export class SupermarketCardComponent {

  text: string;

  constructor() {
    console.log('Hello SupermarketCardComponent Component');
    this.text = 'Hello World';
  }

}
