import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { EditProductPage } from '../edit-product/edit-product';
import { Market } from "../../entities/market";
import { Supermarket } from "../../interfaces/supermarket";
import { ListSupermarketPage } from "../list-supermarket/list-supermarket";

var globalMarketTemp: Market;


@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html'
})
export class ShoppingPage implements OnInit {

  private get market(): Market {
    globalMarketTemp = globalMarketTemp || new Market();
    return globalMarketTemp;
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private productServiceProvider: ProductServiceProvider,
    public modalCtrl: ModalController) {
  }

  public deleteProduct(item: any): void {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure to remove the product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes!',
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
    let subscribeProduct = this.productServiceProvider.getProduct(text).subscribe(product => {
      subscribeProduct.unsubscribe();
      if (!!product.supermarkets && product.supermarkets[this.market.supermarket.$key]) {
        this.market.add(product);
      } else {
        product.name = product.name || '';
        product.brand = product.brand || '';
        product.supermarkets = product.supermarkets || {};
        product.supermarkets[this.market.supermarket.$key] = null;

        this.navCtrl.push(EditProductPage, {
          edit: product,
          supermarket: this.market.supermarket.$key,
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

    newProduct.supermarkets[this.market.supermarket.$key] = null;

    this.navCtrl.push(EditProductPage, {
      custom: true,
      edit: newProduct,
      supermarket: this.market.supermarket.$key,
      callback: (product) => new Promise((resolve, reject) => {
        this.market.add(product);
        resolve();
      })
    });
  }

  ngOnInit(): void {
    if (!this.market.supermarket) {
      this.openSelectSupermarket();
    }
  }

  openSelectSupermarket(): void {
    let modal = this.modalCtrl.create(ListSupermarketPage, this.market.supermarket);
    modal.present();
    modal.onWillDismiss((supermarket: Supermarket) => {
      if (supermarket) {
        this.market.supermarket = supermarket;
      }
    });
  }
}
