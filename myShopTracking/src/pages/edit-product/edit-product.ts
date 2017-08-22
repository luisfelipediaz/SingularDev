import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage implements OnInit {
  private new: Product;
  private edit: Product;
  private supermarket: string;
  private custom: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productServiceProvider: ProductServiceProvider) {
  }

  public convertToNumber(event): number { return +event; }

  public guardar(): void {
    const callBack = this.navParams.get("callback");

    if (this.custom) {
      this.edit.id = this.edit.name;
    } else {
      this.productServiceProvider.pushProduct(this.edit)
    }

    if (callBack) {
      callBack(this.edit).then(() => { this.navCtrl.pop() });
    }
  }

  ngOnInit(): void {
    this.new = this.navParams.get("new");
    this.supermarket = this.navParams.get("supermarket");
    
    this.edit = this.navParams.get("edit");
    this.custom = this.navParams.get("custom");

    if (!this.custom && this.new) {
      this.edit = {
        id: this.new.id,
        supermarkets: this.new.supermarkets,
        name: this.new.name,
        brand: this.new.brand
      };
      
    } else if (this.custom && !this.edit) {
      this.edit = {
        id: null,
        supermarkets: this.new.supermarkets,
        name: this.new.name,
        brand: this.new.brand
      };
    } else if (!this.edit) {
      throw new ReferenceError("La página EditProduct esperaba por lo menos un parametro ('new' or 'edit' or 'custom')");
    }

  }
}
