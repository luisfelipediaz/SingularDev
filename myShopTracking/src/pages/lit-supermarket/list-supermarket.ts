import { Component } from '@angular/core';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { Subscription } from "rxjs/Subscription";
import { ViewController } from "ionic-angular";
import * as _ from 'lodash';
import { Subject } from "rxjs/Subject";

var supermarketSubscription: Subscription;
var globalSupermarkets: Supermarket[];
var globalBrands: string[];

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {

  supermarketSelect: Supermarket;
  name: Subject<string>;

  get brands(): string[] {
    return globalBrands;
  }

  supermarkets: Supermarket[];

  constructor(
    private supermarketServiceProvider: SupermarketServiceProvider,
    public viewCtrl: ViewController) {
    this.name = new Subject();
  }

  ngOnInit(): void {
    this.supermarketSelect = this.viewCtrl.data;

    supermarketSubscription = supermarketSubscription || this.supermarketServiceProvider.getSupermarket().subscribe(supermarkets => {
      globalSupermarkets = supermarkets;
      this.supermarkets = globalSupermarkets;
      globalBrands = _.uniq(_.map(this.supermarkets, 'brand'));
    });

    this.name.subscribe(value => {
      
      this.supermarkets = globalSupermarkets.filter(supermarket => supermarket.name.match(new RegExp(value, "gi")));
      globalBrands = _.uniq(_.map(this.supermarkets, 'brand'));
    });
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  marketSelect(select: Supermarket): void {
    this.viewCtrl.dismiss(select);
  }

  getSupermarketsByBrand(brand: string) {
    return this.supermarkets.filter(supermarket => supermarket.brand === brand);
  }

  filterSupermarkets(ev: any) {
    this.name.next(ev.target.value);
  }
}
