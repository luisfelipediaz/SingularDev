import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";

/**
 * Generated class for the EditProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage implements OnInit {
  private new: string;
  private edit: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productServiceProvider: ProductServiceProvider) {
  }

  public guardar(): void {
    this.productServiceProvider.pushProduct(this.edit).then(() => {
      const callBack = this.navParams.get("callback");
      if (callBack) {
        callBack(this.edit).then(() => { this.navCtrl.pop() });
      }
    });
  }

  ngOnInit(): void {
    this.new = this.navParams.get("new");
    if (!this.new) {
      this.edit = this.navParams.get("edit");
      if (!this.edit) {
        throw new ReferenceError("La página EditProduct esperaba por lo menos un parametro ('new' or 'edit')");
      }
    } else {
      this.edit = {
        id: this.new,
        price: 100,
        supermarket: {
          brand: "Alkosto",
          city: "Bogotá",
          name: "Alkosto 170"
        },
        title: ""
      }
    }
  }
}
