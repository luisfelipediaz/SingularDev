import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { mergeMap, map, take, withLatestFrom, tap, debounceTime } from 'rxjs/operators';
import { Product, ProductInMarket } from '../../app.model';

import { of, from, EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModalController, LoadingController } from '@ionic/angular';
import { RegisterProductComponent } from 'src/app/shared/register-product/register-product.component';

import * as marketActions from '../actions/market.actions';
import * as marketSelectors from '../selectors/market.selectors';

@Injectable()
export class MarketEffects {
    private loader: HTMLIonLoadingElement;

    constructor(
        private actions$: Actions,
        private store: Store,
        private firestore: AngularFirestore,
        private modalController: ModalController,
        private loadingController: LoadingController
    ) { }

    addCustomProduct$ = createEffect(() => this.actions$.pipe(
        ofType(marketActions.addCustomProduct),
        withLatestFrom(this.store.select(marketSelectors.getCurrentSupermarketId)),
        mergeMap(() => from(this.getDataProductFromPage({ id: this.firestore.createId(), isCustom: true }))),
        map(({ data: product }) =>
            !!product && marketActions.addProduct({ product: { ...product, total: 0, units: 1 } })
            || marketActions.cancelAdd()
        )
    ));

    preAddProduct$ = createEffect(() => this.actions$.pipe(
        ofType(marketActions.preAddProduct),
        map(action => action.product),
        tap(async () => await (this.loader = await this.loadingController.create({ message: 'Please wait...' })).present()),
        withLatestFrom(this.store.select(marketSelectors.getCurrentSupermarketId)),
        mergeMap(([productBarcode, supermarket]) => this.firestore.doc<Product>(`products/${productBarcode}`).valueChanges().pipe(
            take(1),
            mergeMap(product =>
                !!product && this.firestore.doc<{ price: number }>(`products/${productBarcode}/supermarkets/${supermarket}`).valueChanges()
                    .pipe(
                        map(productInSupermarket =>
                            !!productInSupermarket &&
                            marketActions.addProduct({ product: { ...product, price: productInSupermarket.price, units: 1, total: 0 } })
                            || marketActions.registerOrUpdateProduct(({ product, supermarket }))
                        )
                    ) ||
                of(marketActions.registerOrUpdateProduct({ product: { id: productBarcode }, supermarket }))
            )
        )),
        tap(async () => await this.loader.dismiss())
    ));

    launchUpdateProduct$ = createEffect(() => this.actions$.pipe(
        ofType(marketActions.launchUpdateProduct),
        map(action => action.product),
        withLatestFrom(this.store.select(marketSelectors.getCurrentSupermarketId)),
        map(([product, supermarket]) => marketActions.registerOrUpdateProduct(({ product, supermarket })))
    ));

    registerNewProduct$ = createEffect(() => this.actions$.pipe(
        ofType(marketActions.registerOrUpdateProduct),
        mergeMap(({ product, supermarket }) => from(this.getDataProductFromPage(product))
            .pipe(
                mergeMap(async ({ data }) => !!data && (await this.registerNewProductInFirestore(product.id, data, supermarket))),
                map((data) =>
                    !!data && marketActions.addProduct({ product: { ...data, total: 0, units: 1 } })
                    || marketActions.cancelAdd()
                )
            )
        )
    ));

    private async registerNewProductInFirestore(productBarcode: string, data: any, supermarket: string): Promise<ProductInMarket> {
        await this.firestore.doc(`products/${productBarcode}`).set({ brand: data.brand, id: data.id, name: data.name });
        await this.firestore.doc(`products/${productBarcode}/supermarkets/${supermarket}`).set({ price: data.price });
        return data;
    }

    private async getDataProductFromPage(product: Partial<Product>): Promise<{ data?: any }> {
        const modal = await this.modalController.create({
            component: RegisterProductComponent,
            componentProps: { product }
        });
        await modal.present();
        return modal.onWillDismiss();
    }
}
