import { Component } from '@angular/core';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { FirebaseListObservable } from "angularfire2/database";
import { ViewController } from "ionic-angular";
import * as _ from 'lodash';

var globalSupermarketLists: { [id: string]: Supermarket[] };
var globalSupermarketBrands: FirebaseListObservable<any>;

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {

  supermarketSelect: Supermarket;
  filters: any = {};

  get supermarketLists(): { [id: string]: Supermarket[] } {
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
      //globalSupermarketLists[brand] = 
      this.supermarketServiceProvider.getSupermarket(brand).subscribe(supermarkets => {
        globalSupermarketLists[brand] = _.filter(supermarkets, _.conforms(this.filters))
      })
      this.supermarketServiceProvider.getSupermarket(brand);

    }
    return brand;
  }

  filterSupermarkets(ev: any) {
    this.filters["name"] = value => {
      debugger;
      return value.indexOf(ev.target.value) > -1;
    }
    debugger;
    globalSupermarketLists["Alkosto"] = _.filter(globalSupermarketLists["Alkosto"], _.conforms(this.filters));
  }
}
