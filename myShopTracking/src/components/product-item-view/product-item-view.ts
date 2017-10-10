import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, ItemSliding } from "ionic-angular";

import { ProductSupermarket } from '../../interfaces/product-supermarket';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'product-item-view',
  templateUrl: 'product-item-view.html'
})
export class ProductItemViewComponent {
  @Input()
  public product: ProductSupermarket;

  @Input()
  public supermarketKey: string;

  @Output()
  public productDelete: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(): void {
  }

  public edit(slidingItem: ItemSliding): void {
    slidingItem.close();
    let product = this.product as Product;
    product.supermarkets = {};
    product.supermarkets[this.supermarketKey] = {
      id: this.supermarketKey,
      price: this.product.price,
      discount: this.product.discount
    };

    this.navCtrl.push('EditProductPage', {
      edit: product,
      supermarket: this.supermarketKey,
      custom: this.product.id === this.product.name,
      callback: (product) => new Promise((resolve, reject) => {
        resolve();
      })
    });
  }

  public delete(): void {
    this.productDelete.emit(this.product);
  }
}