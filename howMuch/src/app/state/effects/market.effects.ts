import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, map, take, withLatestFrom } from 'rxjs/operators';
import { Product, ProductInMarket } from '../../app.model';

import { iif, of, Observable, from } from 'rxjs';
import { Store } from '@ngrx/store';
import * as marketActions from '../actions/market.actions';
import * as marketSelectors from '../selectors/market.selectors';
import { ModalController } from '@ionic/angular';
import { RegisterProductComponent } from 'src/app/shared/register-product/register-product.component';

@Injectable()
export class MarketEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private firestore: AngularFirestore,
        private modalController: ModalController
    ) { }

    preAddProduct$ = createEffect(() => this.actions$.pipe(
        ofType(marketActions.preAddProduct),
        map(action => action.product),
        withLatestFrom(this.store.select(marketSelectors.getCurrentSupermarketId)),
        mergeMap(([productBarcode, supermarket]) => this.firestore.doc<Product>(`products/${productBarcode}`).valueChanges().pipe(
            take(1),
            mergeMap(product =>
                !!product && this.firestore.doc<{ price: number }>(`products/${productBarcode}/supermarkets/${supermarket}`)
                    .valueChanges().pipe(
                        map(productInSupermarket =>
                            marketActions.addProduct({ product: { ...product, price: productInSupermarket.price, units: 1, total: 0 } })
                        )
                    ) ||
                of(marketActions.registerNewProduct({ productBarcode, supermarket }))
            )
        )),
    ));

    registerNewProduct$ = createEffect(() => this.actions$.pipe(
        ofType(marketActions.registerNewProduct),
        mergeMap(({ productBarcode, supermarket }) => from(this.getDataOfNewProduct(productBarcode))
            .pipe(
                mergeMap(async ({ data }) => (await this.registerNewProduct(productBarcode, data, supermarket))),
                map((data) => marketActions.addProduct({ product: { ...data, total: 0, units: 1 } }))
            )
        )
    ));

    private async registerNewProduct(productBarcode: string, data: any, supermarket: string): Promise<ProductInMarket> {
        await this.firestore.doc(`products/${productBarcode}`).set({ brand: data.brand, id: data.id, name: data.name });
        await this.firestore.doc(`products/${productBarcode}/supermarkets/${supermarket}`).set({ price: data.price });
        return data;
    }

    private async getDataOfNewProduct(productBarcode: string): Promise<{ data?: any }> {
        const modal = await this.modalController.create({
            component: RegisterProductComponent,
            componentProps: { productBarcode }
        });
        await modal.present();
        return modal.onWillDismiss();
    }
}
