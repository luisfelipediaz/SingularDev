import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';

@Component({
  selector: 'page-supermarket',
  templateUrl: 'supermarket.html',
})
export class SupermarketPage implements OnInit {
  private new: Supermarket;
  private edit: Supermarket;

  constructor(public navCtrl: NavController, public navParams: NavParams, private supermarketServiceProvider: SupermarketServiceProvider) {
  }

  public guardar(): void {
    this.supermarketServiceProvider.pushSupermarket(this.new);
  }

  ngOnInit(): void {
    this.new = {
      id: '',
      brand: '',
      name: '',
      city: ''
    };
  }
}
