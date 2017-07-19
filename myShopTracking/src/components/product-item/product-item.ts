import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-item',
  templateUrl: 'product-item.html'
})
export class ProductItemComponent {

  @Input()
  public product: {
    id: any,
    title: string,
    price: number,
    count: number,
    unitPrice: number
  };

  @Output()
  public productChangeCount: EventEmitter<any> = new EventEmitter();

  @Output()
  public productDelete: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  public minus(): void {
    this.product.count--;
    this.product.price = this.product.count * this.product.unitPrice;

    this.productChangeCount.emit(this.product);
  }

  public more(): void {
    this.product.count++;
    this.product.price = this.product.count * this.product.unitPrice;

    this.productChangeCount.emit(this.product);
  }

  public delete(): void {
    this.productDelete.emit(this.product);
  }
}
