import { Component } from '@angular/core';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { FirebaseListObservable } from "angularfire2/database";
import { ViewController } from "ionic-angular";

var globalSupermarketLists: { [id: string]: FirebaseListObservable<Supermarket[]> };
var globalSupermarketBrands: FirebaseListObservable<any>;

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {

  supermarketSelect: Supermarket;

  get supermarketLists(): { [id: string]: FirebaseListObservable<Supermarket[]> } {
    return globalSupermarketLists;
  }

  get supermarketBrands(): FirebaseListObservable<any> {
    return globalSupermarketBrands;
  }

  constructor(
    private supermarketServiceProvider: SupermarketServiceProvider,
    public viewCtrl: ViewController) {

  }

  ngOnInit(): void {
    globalSupermarketLists = globalSupermarketLists || {};
    globalSupermarketBrands = globalSupermarketBrands || this.supermarketServiceProvider.getSupermarketBrands();
    this.supermarketSelect = this.viewCtrl.data;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  marketSelect(select: Supermarket): void {
    this.viewCtrl.dismiss(select);
  }

  verificarLista(brand: string): string {
    if (!globalSupermarketLists[brand]) {      
      globalSupermarketLists[brand] = this.supermarketServiceProvider.getSupermarket(brand);
    }
    return brand;
  }

  filterSupermarkets(ev: any) {

  }
}
