import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { EditProductPage } from '../edit-product/edit-product';
import { Market } from "../../entities/market";
import { Supermarket } from "../../interfaces/supermarket";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage implements OnInit {

  private market: Market;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner, private productServiceProvider: ProductServiceProvider) {
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
            this.market.delete(item.product);
          }
        }
      ]
    });
    alert.present();
  }

  public escanerCodigo(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (!barcodeData.cancelled) {
        this.productServiceProvider.getProduct(barcodeData.text, this.market.supermarket.brand).then(product => {
          if (product) {
            product.price = +product.price;
            this.market.add(product);
          } else {
            this.navCtrl.push(EditProductPage, {
              new: barcodeData.text,
              callback: (product) => new Promise((resolve, reject) => {
                this.market.add(product);
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

  public customProduct(): void {
    this.navCtrl.push(EditProductPage, {
      custom: true,
      callback: (product) => new Promise((resolve, reject) => {
        this.market.add(product);
        resolve();
      })
    });
  }

  ngOnInit(): void {
    this.market = new Market();

    this.market.supermarket = {
      brand: "Alkosto",
      city: "Bogotá",
      name: "Alkosto 170"
    }
  }

  marketSelect(supermarket:Supermarket):void{
    
  }
}
