import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Supermarket } from "../../interfaces/supermarket";
import { SupermarketServiceProvider } from "../../providers/supermarket-service/supermarket-service";
/**
 * Generated class for the SupermarketPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage {

  private supermarketList: Supermarket[];
  constructor(private supermarketServiceProvider:Supermarket, private alertCtrl: AlertController) {
  }

  ngOnInit(): void{

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupermarketPage');
  }



}
