import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { EditProductPage } from '../edit-product/edit-product';
import { Market } from "../../entities/market";
import { Supermarket } from "../../interfaces/supermarket";
import { Product } from "../../interfaces/product";
import { SupermarketServiceProvider } from "../../providers/supermarket-service/supermarket-service";


@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage implements OnInit {

  private market: Market;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner, private productServiceProvider: ProductServiceProvider,
    private supermarketService: SupermarketServiceProvider) {

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
    let subscribeProduct = this.productServiceProvider.getProduct(text).subscribe(product => {
      subscribeProduct.unsubscribe();
      if (product.supermarkets && product.supermarkets[this.market.supermarket.id]) {
        this.market.add(product);
      } else {
        let newProduct: Product = {
          id: text,
          supermarkets: {},
          brand: product.brand || "",
          name: product.name || ""
        };

        newProduct.supermarkets[this.market.supermarket.id] = 0;

        this.navCtrl.push(EditProductPage, {
          new: newProduct,
          supermarket: this.market.supermarket.id,
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

    newProduct.supermarkets[this.market.supermarket.id] = 0;

    this.navCtrl.push(EditProductPage, {
      custom: true,
      new: newProduct,
      supermarket: this.market.supermarket.id,
      callback: (product) => new Promise((resolve, reject) => {
        this.market.add(product);
        resolve();
      })
    });
  }

  ngOnInit(): void {
    this.market = new Market();

    this.supermarketService.pushSupermarket({
      id: "dd252afe3bdb0a59828166e128016445",
      brand: "Alkosto",
      city: "Bogotá",
      name: "Alkosto 170"
    });

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
