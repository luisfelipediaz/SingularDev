import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage implements OnInit {
  private edit: Product;
  private supermarket: string;
  private custom: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productServiceProvider: ProductServiceProvider) {
  }

  public convertToNumber(event): number { return +event; }

  public guardar(): void {
    debugger;
    const callBack = this.navParams.get("callback");

    if (this.custom) {
      this.edit.id = this.edit.name;
    } else {
      this.productServiceProvider.pushProduct(this.edit);
      this.productServiceProvider.updatePrice(this.edit, this.supermarket);
    }

    if (callBack) {
      callBack(this.edit).then(() => { this.navCtrl.pop() });
    }
  }

  ngOnInit(): void {
    this.supermarket = this.navParams.get("supermarket");
    
    this.edit = this.navParams.get("edit");
    
    this.custom = this.navParams.get("custom");
  }
}
