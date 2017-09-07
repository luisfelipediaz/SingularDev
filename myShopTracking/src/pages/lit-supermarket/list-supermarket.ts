import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { Subscription } from "rxjs/Subscription";

import * as _ from 'lodash';

var supermarketSubscription: Subscription;
var globalSupermarkets: Supermarket[];

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {

  supermarketSelect: Supermarket;
  name: string;

  batch: number = 10;
  lastKey: string = '';
  finished: boolean = false;
  supermarkets: Supermarket[] = [];
  brands: string[];

  constructor(
    private supermarketServiceProvider: SupermarketServiceProvider,
    public viewCtrl: ViewController) {
  }

  ngOnInit(): void {
    this.supermarketSelect = this.viewCtrl.data;
    this.loadSupermarkets();
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
    this.applyFilter(ev.target.value);
    //while(this.supermarkets.length < this.batch && !this.finished)
  }

  applyFilter(value: string) {
    this.supermarkets = globalSupermarkets.filter(supermarket => supermarket.name.match(new RegExp(value, "gi")));
    this.getUniqueBrands();

    if (this.supermarkets.length < this.batch && !this.finished)
      this.loadSupermarkets(null, value);
  }

  doInfinite(infinityScroll) {
    this.loadSupermarkets(infinityScroll);
  }

  loadSupermarkets(infinityScroll?, filter?: string) {
    if (!this.finished) {
      supermarketSubscription = this.supermarketServiceProvider.getSupermarket(this.batch + 1, this.lastKey).subscribe(supermarkets => {
        supermarketSubscription.unsubscribe();

        this.lastKey = _.last(supermarkets).name
        const newSupermarkets = _.slice(supermarkets, 0, this.batch);

        globalSupermarkets = _.concat(globalSupermarkets || [], newSupermarkets);
        this.supermarkets = globalSupermarkets;

        this.getUniqueBrands();

        if (this.lastKey === _.last(newSupermarkets).name) {
          this.finished = true;
          if (!!infinityScroll) infinityScroll.enable(false);
        }

        if (!!filter) this.applyFilter(filter);
      });
    } else if (!!infinityScroll) {
      infinityScroll.enable(false);
    }
  }

  getUniqueBrands(): void {
    this.brands = _.uniq(_.map(this.supermarkets, 'brand'));
  }
}
