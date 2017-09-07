import { Component } from '@angular/core';
import { ViewController } from "ionic-angular";

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { Subscription } from "rxjs/Subscription";

import * as _ from 'lodash';

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {

  supermarketSubscription: Subscription;

  supermarkets: Supermarket[] = [];
  globalSupermarkets: Supermarket[];

  supermarketSelect: Supermarket;
  name: string;

  batch: number = 10;
  lastKey: string = '';
  finished: boolean = false;
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
  }

  applyFilter(value: string) {
    this.supermarkets = this.globalSupermarkets.filter(supermarket => supermarket.name.match(new RegExp(value, "gi")));
    this.getUniqueBrands();

    if (this.supermarkets.length < this.batch && !this.finished) this.loadSupermarkets(null, value);
  }

  doInfinite(infinityScroll) {
    this.loadSupermarkets(infinityScroll);
  }

  loadSupermarkets(infinityScroll?, filter?: string) {
    if (!this.finished) {
      this.supermarketSubscription = this.supermarketServiceProvider.getSupermarket(this.batch + 1, this.lastKey).subscribe(supermarkets => {
        this.supermarketSubscription.unsubscribe();

        this.lastKey = _.last(supermarkets).name
        const newSupermarkets = _.slice(supermarkets, 0, this.batch);

        this.globalSupermarkets = _.concat(this.globalSupermarkets || [], newSupermarkets);
        this.supermarkets = this.globalSupermarkets;

        this.getUniqueBrands();

        if (this.lastKey === _.last(newSupermarkets).name) {
          this.finished = true;
          if (!!infinityScroll) infinityScroll.enable(false);
        }

        if (!!filter) this.applyFilter(filter);
      });
    } else if (!!infinityScroll)
      infinityScroll.enable(false);
  }

  getUniqueBrands(): void {
    this.brands = _.uniq(_.map(this.supermarkets, 'brand'));
  }
}
