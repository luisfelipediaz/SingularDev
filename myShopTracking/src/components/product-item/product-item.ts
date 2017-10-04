import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../interfaces/product";
import { NavController, ItemSliding } from "ionic-angular";
import { Supermarket } from "../../interfaces/supermarket";

@Component({
  selector: 'product-item',
  templateUrl: 'product-item.html'
})
export class ProductItemComponent {

  @Input()
  public item: {
    product: Product,
    price: number;
    count: number;
  };

  @Input()
  supermarket: Supermarket;

  @Output()
  public productChange: EventEmitter<any> = new EventEmitter();

  @Output()
  public productMore: EventEmitter<any> = new EventEmitter();

  @Output()
  public productMinus: EventEmitter<any> = new EventEmitter();

  @Output()
  public productDelete: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  public minus(): void {
    this.productMinus.emit(this.item);
  }

  public more(): void {
    this.productMore.emit(this.item);
  }

  public edit(slidingItem: ItemSliding): void {
    slidingItem.close();
    this.navCtrl.push('EditProductPage', {
      edit: this.item.product,
      supermarket: this.supermarket.id,
      custom: this.item.product.id === this.item.product.name,
      callback: (product) => new Promise((resolve, reject) => {
        this.item.price = this.item.count * product.supermarkets[this.supermarket.id].price;
        this.productChange.emit(this.item);
        resolve();
      })
    });
  }

  public delete(): void {
    this.productDelete.emit(this.item);
  }
}
