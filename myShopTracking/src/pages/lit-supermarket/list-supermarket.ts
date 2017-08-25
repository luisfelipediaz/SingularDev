import { Component } from '@angular/core';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { FirebaseListObservable } from "angularfire2/database";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {
  private supermarketLists: { [id: string]: FirebaseListObservable<Supermarket[]> };
  private supermarketSelect: Supermarket;
  private supermarketBrands: FirebaseListObservable<any>;

  constructor(
    private supermarketServiceProvider: SupermarketServiceProvider,
    public viewCtrl: ViewController) {

  }

  ngOnInit(): void {
    this.supermarketLists = this.supermarketLists || {};
    this.supermarketBrands = this.supermarketServiceProvider.getSupermarketBrands();
    this.supermarketSelect = this.viewCtrl.data;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  marketSelect(select: Supermarket): void {
    this.viewCtrl.dismiss(select);
  }

  verificarLista(brand: string): string {
    if (!this.supermarketLists[brand]) {
      this.supermarketLists[brand] = this.supermarketServiceProvider.getSupermarket(brand);
    }
    return brand;
  }
}
