import { Component } from '@angular/core';

import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from '../../providers/supermarket-service/supermarket-service';
import { FirebaseListObservable } from "angularfire2/database";
import { ViewController } from "ionic-angular";

@Component({
  selector: 'list-supermarket',
  templateUrl: 'list-supermarket.html'
})
export class ListSupermarketPage {
  private supermarketList: FirebaseListObservable<Supermarket[]>;
  private supermarketSelect: Supermarket;

  constructor(
    private supermarketServiceProvider: SupermarketServiceProvider,
    public viewCtrl: ViewController) {

  }

  ngOnInit(): void {
    this.supermarketList = this.supermarketServiceProvider.getSupermarket();
    this.supermarketSelect = this.viewCtrl.data;
  }

  dismiss(): void{
    this.viewCtrl.dismiss();
  }

  marketSelect(select: Supermarket): void {    
    this.viewCtrl.dismiss(select);
  }

}
