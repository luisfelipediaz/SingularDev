import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { SupermarketSelectorComponent } from '../shared/supermarket-selector/supermarket-selector.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import * as marketActions from '../state/actions/market.actions';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  constructor(
    private store: Store,
    public modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner
  ) { }

  ngOnInit() {
    this.openSelectSupermarket();
  }

  async openSelectSupermarket() {
    const modal = await this.modalCtrl.create({
      component: SupermarketSelectorComponent
    });

    await modal.present();
    const { data: supermarket } = await modal.onWillDismiss();
    this.store.dispatch(marketActions.changeSupermarket({ supermarket }));
  }

  async scanProduct() {
    try {
      const { cancelled, text: product } = await this.barcodeScanner.scan({ orientation: 'portrait', showTorchButton: true });
      if (cancelled) { return; }
      this.store.dispatch(marketActions.preAddProduct({ product }));
    } catch {
      this.store.dispatch(marketActions.preAddProduct({ product: prompt('Digite el código') }));
    }

  }
}
