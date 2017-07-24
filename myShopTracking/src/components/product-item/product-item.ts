import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../interfaces/product";

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

  @Output()
  public productChangeCount: EventEmitter<any> = new EventEmitter();

  @Output()
  public productDelete: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public minus(): void {
    this.item.count--;
    this.item.price = this.item.count * this.item.product.price;

    this.productChangeCount.emit(this.item);
  }

  public more(): void {
    this.item.count++;
    this.item.price = this.item.count * this.item.product.price;

    this.productChangeCount.emit(this.item);
  }

  public delete(): void {
    this.productDelete.emit(this.item);
  }
}
