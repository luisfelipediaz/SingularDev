import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { EditProductPage } from '../edit-product/edit-product';
import { Market } from "../../interfaces/market";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  private market: Market;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner, private productServiceProvider: ProductServiceProvider) {

    this.market = {
      date: new Date(),
      products: [],
      supermarket: {
        brand: "Alkosto",
        city: "Bogotá",
        name: "Alkosto 170"
      },
      total: 0
    }
  }

  public deleteProduct(item: any): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Está seguro de quitar el producto de la compra?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            var indexDel = -1;
            this.market.products.forEach((item, index) => {
              if (item.product.id === item.product.id)
                indexDel = index;
            });

            if (indexDel > -1)
              this.market.products.splice(indexDel, 1);

            this.calcTotalShopping();
          }
        }
      ]
    });
    alert.present();
  }

  public calcTotalShopping(): void {
    this.market.total = 0;
    this.market.products.forEach((item) => {
      this.market.total += item.price;
    });
  }
  public escanerCodigo(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (!barcodeData.cancelled) {
        this.productServiceProvider.getProduct(barcodeData.text, this.market.supermarket.brand).then(product => {
          if (product) {
            this.market.products.push({
              product: product,
              count: 1,
              price: product.price
            });
          } else {
            this.navCtrl.push(EditProductPage, {
              new: barcodeData.text,
              callback: (product) => new Promise((resolve, reject) => {
                this.market.products.push({
                  product: product,
                  count: 1,
                  price: product.price                  
                });
                resolve();
              })
            });
          }
        });
      }
    }, (err) => {
      console.log(err);
    });
  }
}
