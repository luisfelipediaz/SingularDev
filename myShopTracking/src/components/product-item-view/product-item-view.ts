import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "../../interfaces/product";
import { NavController, ItemSliding } from "ionic-angular";
import { EditProductPage } from "../../pages/edit-product/edit-product";

@Component({
  selector: 'product-item-view',
  templateUrl: 'product-item-view.html'
})
export class ProductItemViewComponent {
  @Input()
  public product: Product;

  @Output()
  public productDelete: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController) {
  }

  ngOnInit(): void {
  }

  public edit(slidingItem: ItemSliding): void {
    slidingItem.close();
    this.navCtrl.push(EditProductPage, {
      edit: this.product,
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