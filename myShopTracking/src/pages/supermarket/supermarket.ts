import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, IonicPage } from 'ionic-angular';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';

@IonicPage()
@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit {
  private new: Supermarket;

  constructor(
    public navCtrl: NavController,
    private supermarketServiceProvider: SupermarketServiceProvider,
    private alertCtrl: AlertController) {
  }

  public guardar(): void {
    this.supermarketServiceProvider.pushSupermarket(this.new);
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Supermarket saved",
      buttons: [
        {
          text: "Go to shop!",
          handler: () => {
            this.navCtrl.setRoot('ShoppingPage', {
              supermarket: this.new
            });
          }
        }, {
          text: "Ok",
          handler: () => {
            this.initModel();
          }
        }]
    });
    alert.present();
  }

  ngOnInit(): void {
    this.initModel();
  }

  initModel() {
    this.new = {
      brand: '',
      name: '',
      city: ''
    };
  }
}
