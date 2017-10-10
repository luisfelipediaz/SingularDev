import { Component } from '@angular/core';
import { ViewController, IonicPage } from "ionic-angular";

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';

import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {

  supermarkets: Supermarket[] = [];
  globalSupermarkets: Supermarket[];

  supermarketSelect: Supermarket;

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
      this.supermarketServiceProvider.getSupermarkets(this.batch, this.lastKey).subscribe(supermarkets => {
        this.finished = false;
        this.lastKey = supermarkets[supermarkets.length - 1].name;

        this.globalSupermarkets = _.unionWith(this.globalSupermarkets || [], supermarkets, _.isEqual);
        this.supermarkets = this.globalSupermarkets;

        this.getUniqueBrands();

        if (!!infinityScroll) infinityScroll.complete();
        if (supermarkets.length < this.batch) {
          this.finished = true;
        }

        if (!!filter) this.applyFilter(filter);
      });
    } else if (!!infinityScroll)
      infinityScroll.enable(false);
  }

  getUniqueBrands(): void {
    this.brands = _.uniq(this.supermarkets.map(supermarket => supermarket.brand));
  }
}