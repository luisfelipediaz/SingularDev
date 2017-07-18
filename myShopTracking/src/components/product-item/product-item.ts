import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding, Item } from 'ionic-angular';

@Component({
  selector: 'product-item',
  templateUrl: 'product-item.html'
})
export class ProductItemComponent {

  @Input()
  public product: {
    id: number,
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

  public optionsClick(slidingItem: ItemSliding, ionItem: Item): void {
    debugger;
    if (slidingItem.getSlidingPercent() === 1) {
      this.closeOptions(slidingItem);
    } else {
      this.openOptions(slidingItem, ionItem);
    }
  }

  public closeOptions(slidingItem: ItemSliding): void {
    slidingItem.close();
    slidingItem.setElementClass("active-slide", false);
    slidingItem.setElementClass("active-slide", false);
    slidingItem.setElementClass("active-options-right", false);
  }

  public openOptions(slidingItem: ItemSliding, ionItem: Item): void {
    slidingItem.setElementClass("active-sliding", true);
    slidingItem.setElementClass("active-slide", true);
    slidingItem.setElementClass("active-options-right", true);
    ionItem.setElementStyle("transform", "translate3d(-83px, 0px, 0px)")
  }
}
