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

  public openEditProduct(product: Product, custom: boolean = false) {
    this.navCtrl.push('EditProductPage', {
      custom: custom,
      edit: product,
      supermarket: this.market.supermarket.id,
      callback: (product) => new Promise((resolve, reject) => {
        if (!custom)
          this.econtrarPreciosMenores(product);
        this.market.add(product);
        resolve();
      })
    });
  }

  public agregarProducto(text: string): void {
    let subscribeProduct = this.productServiceProvider.getProduct(text).subscribe(product => {
      if (!!subscribeProduct) subscribeProduct.unsubscribe();

      if (product) {
        product.supermarkets = {};
        let priceObservable = this.productServiceProvider.getPrice(text, this.market.supermarket.id).subscribe(result => {

          if (!!priceObservable) priceObservable.unsubscribe();

          if (!!result) {
            product.supermarkets[this.market.supermarket.id] = result;
            this.econtrarPreciosMenores(product);
            this.market.add(product);
          } else {
            product.supermarkets[this.market.supermarket.id] = { price: null };
            this.openEditProduct(product);
          }
        });
      } else {
        product = {
          id: text,
          name: "",
          brand: "",
          supermarkets: {}
        };
        product.supermarkets[this.market.supermarket.id] = { price: null };
        this.openEditProduct(product);
      }
    });
  }

  public customProduct(): void {
    var newProduct: Product = {
      id: null,
      name: "",
      brand: "",
      supermarkets: {}
    };

    newProduct.supermarkets[this.market.supermarket.id] = { price: null };

    this.openEditProduct(newProduct, true);
  }

  openSelectSupermarket(): void {
    let modal = this.modalCtrl.create('ListSupermarketPage', this.market.supermarket);
    modal.present();
    modal.onWillDismiss((supermarket: Supermarket) => {
      if (supermarket) {
        this.market.supermarket = supermarket;
      }
    });
  }

  private econtrarPreciosMenores(product: Product) {
    const lowerPricesSubscription = this.productServiceProvider.getLowerPrices(product.id, product.supermarkets[this.market.supermarket.id].price).subscribe(menores => {
      if (lowerPricesSubscription) lowerPricesSubscription.unsubscribe();

      let keys: string[] = menores.map(menor => menor.id);

      let supermarketsByKeysSubscription = this.supermarketService.getSupermarketsByKeys(keys).subscribe(supermarkets => {

        if (!!supermarketsByKeysSubscription) supermarketsByKeysSubscription.unsubscribe();

        let menoresNombres: string[] = supermarkets.map(supermarket => `
        <tr>
          <td>${supermarket.name}</td>
          <td>${this.commonProvider.numberWithCommas(menores.find(menor => menor.id === supermarket.id).price)}</td>
        </tr>`);

        let alert = this.alertCtrl.create({
          title: "This product is more economic in:",
          buttons: ['OK'],
          message: `<table class="alert-more-economic">${menoresNombres.join('')}</table>`
        });
        alert.present();
      });
    });
  }
}