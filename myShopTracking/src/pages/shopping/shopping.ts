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
        this.agregarProducto(barcodeData.text)
      }
    }, (err) => {
      this.agregarProducto(prompt("Codigo de barras del producto"));
    });

  }

  public agregarProducto(text: string): void {
    this.productServiceProvider.getProduct(text, this.market.supermarket.id).subscribe(product => {
      if (product) {
        this.market.add(product);
      } else {

        var newProduct = {
          id: text,
          supermarkets: {}
        };

        newProduct.supermarkets[this.market.supermarket.id] = true;

        this.navCtrl.push(EditProductPage, {
          new: newProduct,
          callback: (product) => new Promise((resolve, reject) => {
            this.market.add(product);
            resolve();
          })
        });
      }
    });
  }

  public customProduct(): void {
    var newProduct = {
      supermarkets: {}
    };

    newProduct.supermarkets[this.market.supermarket.id] = true;

    this.navCtrl.push(EditProductPage, {
      custom: true,
      new: newProduct,
      callback: (product) => new Promise((resolve, reject) => {
        this.market.add(product);
        resolve();
      })
    });
  }

  ngOnInit(): void {
    this.market = new Market();


    this.market.supermarket = {
      id: "dd252afe3bdb0a59828166e128016445",
      brand: "Alkosto",
      city: "Bogotá",
      name: "Alkosto 170"
    }
  }

  marketSelect(supermarket: Supermarket): void {

  }
}
