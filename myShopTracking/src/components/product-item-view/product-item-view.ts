import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ItemSliding } from "ionic-angular";

import { Product } from "../../interfaces/product";
import { Supermarket } from '../../interfaces/supermarket';
import { EditProductPage } from "../../pages/edit-product/edit-product";

@Component({
  selector: 'product-item-view',
  templateUrl: 'product-item-view.html'
})
export class ProductItemViewComponent {
  @Input()
  public product: Product;

  @Input()
  public supermarketKey: string;

  @Input()
  public supermarket: Supermarket;

  @Output()
  public productDelete: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(): void {
    if (this.supermarket)
      this.supermarketKey = this.supermarket.$key;
  }

  public edit(slidingItem: ItemSliding): void {
    slidingItem.close();
    this.navCtrl.push(EditProductPage, {
      edit: this.product,
      supermarket: this.supermarketKey,
      custom: this.product.$key === this.product.name,
      callback: (product) => new Promise((resolve, reject) => {
        resolve();
      })
    });
  }
  public delete(): void {
    this.productDelete.emit(this.product);
  }
}