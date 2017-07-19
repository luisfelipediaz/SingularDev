import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from '../../providers/product-service/product-service';

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  private items: Array<Product>;

  public total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private barcodeScanner: BarcodeScanner, private productServiceProvider: ProductServiceProvider) {
    this.getProducts();
  }

  public deleteProduct(product: any): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmar',
      message: '¿Está seguro de quitar el producto de la compra?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            var indexDel = -1;
            this.items.forEach((item, index) => {
              if (item.id === product.id)
                indexDel = index;
            });

            if (indexDel > -1)
              this.items.splice(indexDel, 1);

            this.calcTotalShopping();
          }
        }
      ]
    });
    alert.present();
  }

  public calcTotalShopping(): void {
    this.total = 0;
    this.items.forEach((item) => {
      this.total += item.price;
    });
  }

  public getProducts(): void {
    this.productServiceProvider.getProducts().then(products => {      
      this.items = products || new Array<Product>();
      this.calcTotalShopping();
    });
  }

  public escanerCodigo(): void {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (!barcodeData.cancelled)
        this.items.push({
          id: barcodeData.text,
          title: barcodeData.text,
          price: 0,
          count: 0,
          unitPrice: 0
        });
    }, (err) => {
      console.log(err);
    });
  }
}
