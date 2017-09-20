import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';

@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit {
  private new: Supermarket;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
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
          text: "Gracias!",
          handler: () => {
            this.navCtrl.popToRoot();
          }
        }]
    });
    alert.present();
  }

  ngOnInit(): void {
    this.new = {
      brand: '',
      name: '',
      city: ''
    };
  }
}
