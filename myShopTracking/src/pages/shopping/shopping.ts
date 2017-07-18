import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  private items: Array<{
    id: number,
    title: string,
    price: number,
    count: number,
    unitPrice: number
  }> = new Array<any>();

  public total: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.items.push({
      id: 1,
      title: "Coca cola",
      price: 6500,
      count: 1,
      unitPrice: 6500
    });

    this.items.push({
      id: 2,
      title: "Yogourt",
      price: 16020,
      count: 3,
      unitPrice: 5340
    });

    this.items.push({
      id: 3,
      title: "Pan perro bimbo",
      price: 4305,
      count: 7,
      unitPrice: 615
    });

    this.items.push({
      id: 4,
      title: "Desodorante",
      price: 1200,
      count: 12,
      unitPrice: 100
    });

    this.calcTotalShopping();
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

}
