import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as supermarketActions from '../../state/actions/supermarket.actions';
import * as supermarketSelectors from '../../state/selectors/supermarket.selectors';
import * as marketSelectors from '../../state/selectors/market.selectors';
import { Supermarket } from 'src/app/app.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-supermarket-selector',
  templateUrl: './supermarket-selector.component.html',
  styleUrls: ['./supermarket-selector.component.scss'],
})
export class SupermarketSelectorComponent implements OnInit {
  supermarketByBrand$: Observable<{ [brand: string]: Supermarket[] }>;
  currentSelectedId$: Observable<string>;

  constructor(
    private store: Store,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.store.dispatch(supermarketActions.loadSupermarket());
    this.currentSelectedId$ = this.store.select(marketSelectors.getCurrentSupermarketId);
    this.supermarketByBrand$ = this.store.select(supermarketSelectors.getSupermarketsByBrand)
      .pipe(tap((a) => console.log(a)));
  }

  marketSelect(supermarket: Supermarket) {
    this.modalCtrl.dismiss(supermarket);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
