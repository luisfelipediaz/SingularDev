import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController, ModalController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { Market } from "../../entities/market";
import { Supermarket } from "../../interfaces/supermarket";
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { Product } from '../../interfaces/product';
import { CommonProvider } from '../../providers/common/common';
import { MarketServiceProvider } from '../../providers/market-service/market-service';
import { ListSupermarketPage } from '../list-supermarket/list-supermarket';

var globalMarketTemp: Market;

@IonicPage()
@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html'
})
export class ShoppingPage implements OnInit {

  private get market(): Market {
    globalMarketTemp = globalMarketTemp || new Market(this.marketServiceProvider);
    return globalMarketTemp;
  };

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private productServiceProvider: ProductServiceProvider,
    public modalCtrl: ModalController,
    public supermarketService: SupermarketServiceProvider,
    public commonProvider: CommonProvider,
    private marketServiceProvider: MarketServiceProvider) {
  }

  ngOnInit(): void {
    if (!this.market.supermarket) {
      if (!!this.navParams.data.supermarket) this.market.supermarket = this.navParams.data.supermarket
      else this.openSelectSupermarket();
    }
  }

  public deleteProduct(item: any): void {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure to remove the product?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Yes!', handler: () => { this.market.delete(item.product); } }
      ]
    });
    alert.present();
  }

  public escanerCodigo(): void {
    this.barcodeScanner.scan({ orientation: 'portrait', showTorchButton: true }).then((barcodeData) => {
      if (!barcodeData.cancelled) {
        this.agregarProducto(barcodeData.text)
      }
    }, (err) => {
      this.agregarProducto(prompt("Codigo de barras del producto"));
    });
  }

  public agregarProducto(text: string): void {
    let subscribeProduct = this.productServiceProvider.getProduct(text).subscribe(product => {

      if (!!subscribeProduct) subscribeProduct.unsubscribe();

      if (!!product.supermarkets && product.supermarkets[this.market.supermarket.$key]) {
        this.econtrarPreciosMenores(product);
        this.market.add(product);
      } else {
        product.name = product.name || '';
        product.brand = product.brand || '';
        product.supermarkets = product.supermarkets || {};
        product.supermarkets[this.market.supermarket.$key] = null;

        this.navCtrl.push('EditProductPage', {
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

    this.navCtrl.push('EditProductPage', {
      custom: true,
      edit: newProduct,
      supermarket: this.market.supermarket.$key,
      callback: (product) => new Promise((resolve, reject) => {
        this.market.add(product);
        resolve();
      })
    });
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

  private econtrarPreciosMenores(product: Product) {
    let menores: {
      [id: string]: number;
    } = {};

    for (let key in product.supermarkets) {
      if (product.supermarkets[key] < product.supermarkets[this.market.supermarket.$key]) {
        menores[key] = product.supermarkets[key];
      }
    }
    if (Object.keys(menores).length > 0) {
      let menoresNombres: string[] = [];
      for (let key in menores) {
        let subscripcion = this.supermarketService.getSupermarketName(key).subscribe((name) => {

          if (!!subscripcion) subscripcion.unsubscribe();

          menoresNombres.push(`
              <tr>
                <td>${name.$value}</td>
                <td>${this.commonProvider.numberWithCommas(menores[key])}</td>
              </tr>`);
          if (menoresNombres.length == Object.keys(menores).length) {
            let alert = this.alertCtrl.create({
              title: "This product is more economic in:",
              buttons: ['OK'],
              message: `<table class="alert-more-economic">${menoresNombres.join('')}</table>`
            });
            alert.present();
          }
        });
      }
    }
  }
}
