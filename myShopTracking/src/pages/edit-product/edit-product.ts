import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage implements OnInit {
  private new: string;
  private edit: Product;
  private custom: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productServiceProvider: ProductServiceProvider) {
  }

  public convertToNumber(event): number { return +event; }

  public guardar(): void {
    const callBack = this.navParams.get("callback");
    this.edit.price = parseFloat(this.edit.price.toString());
    if (this.custom) {
      this.edit.id = this.edit.name;
      callBack(this.edit).then(() => { this.navCtrl.pop() });
      return;
    }

    this.productServiceProvider.pushProduct(this.edit).then(() => {
      if (callBack) {
        callBack(this.edit).then(() => { this.navCtrl.pop() });
      }
    });
  }

  ngOnInit(): void {
    this.new = this.navParams.get("new");
    this.edit = this.navParams.get("edit");
    this.custom = this.navParams.get("custom");

    if (this.new) {
      this.edit = {
        id: this.new,
        price: 100,
        supermarket: {
          brand: "Alkosto",
          city: "Bogotá",
          name: "Alkosto 170"
        },
        name: "",
        brand: ""
      };
    } else if (this.custom) {
      this.edit = {
        id: null,
        price: 100,
        supermarket: {
          brand: "Alkosto",
          city: "Bogotá",
          name: "Alkosto 170"
        },
        name: "",
        brand: ""
      };
    } else if (!this.edit) {
      throw new ReferenceError("La página EditProduct esperaba por lo menos un parametro ('new' or 'edit' or 'custom')");
    }

  }
}
