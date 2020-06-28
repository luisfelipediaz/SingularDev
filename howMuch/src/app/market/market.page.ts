import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { SupermarketSelectorComponent } from '../shared/supermarket-selector/supermarket-selector.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ProductInMarket } from '../app.model';
import { Observable } from 'rxjs';

import * as marketActions from '../state/actions/market.actions';
import * as marketSelectors from '../state/selectors/market.selectors';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  isEmpty$: Observable<boolean>;
  marketTotal$: Observable<number>;
  products$: Observable<ProductInMarket[]>;

  constructor(
    private store: Store,
    public modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.openSelectSupermarket();

    this.isEmpty$ = this.store.select(marketSelectors.isEmpty);
    this.products$ = this.store.select(marketSelectors.getProducts);
    this.marketTotal$ = this.store.select(marketSelectors.getTotal);
  }

  async openSelectSupermarket() {
    const modal = await this.modalCtrl.create({
      component: SupermarketSelectorComponent
    });

    await modal.present();
    const { data: supermarket } = await modal.onWillDismiss();

    if (!!supermarket) { this.store.dispatch(marketActions.changeSupermarket({ supermarket })); }
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

  addCustomProduct() {
    this.store.dispatch(marketActions.addCustomProduct());
  }

  moreOfProduct({ id: product }: ProductInMarket) {
    this.store.dispatch(marketActions.increaseQuantityProduct({ product }));
  }

  minusOfProduct({ id: product }: ProductInMarket) {
    this.store.dispatch(marketActions.decreaseQuantityProduct({ product }));
  }

  async deleteProduct({ id: product }: ProductInMarket) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Do you want remove product?',
      buttons: [
        { text: 'Okay', handler: () => this.store.dispatch(marketActions.deleteProduct({ product })) },
        { text: 'Cancel', role: 'cancel' }
      ]
    });

    await alert.present();
  }

  editProduct(product: ProductInMarket) {
    this.store.dispatch(marketActions.launchUpdateProduct({ product }));
  }
}
