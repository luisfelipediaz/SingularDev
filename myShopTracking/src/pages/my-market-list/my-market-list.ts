import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyMarketListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-market-list',
  templateUrl: 'my-market-list.html',
})
export class MyMarketListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyMarketListPage');
  }

  products:string[] = [];

  productSelected(product: string){
    console.log("Select product", product);
  }

  add(product:string){
    this.products.push(product);
    console.log("Producto para agregar", product);
  }

}