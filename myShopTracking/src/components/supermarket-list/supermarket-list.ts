import { Component, Output, EventEmitter } from '@angular/core';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'supermarket-list',
  templateUrl: 'supermarket-list.html'
})
export class SupermarketListComponent {
  private supermarketList: FirebaseListObservable<Supermarket[]>;
  constructor(private supermarketServiceProvider: SupermarketServiceProvider) {

  }
  @Output()
  //public productChangeCount: EventEmitter<any> = new EventEmitter();
  public selectSupermarket: EventEmitter<Supermarket> = new EventEmitter();

  ngOnInit(): void {
    this.supermarketList = this.supermarketServiceProvider.getSupermarket();
  }

  marketSelect(select: Supermarket): void {
    this.selectSupermarket.emit(select);
  }

}
