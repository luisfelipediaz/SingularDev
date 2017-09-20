import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import * as _ from 'lodash';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from "../../providers/supermarket-service/supermarket-service";


@Component({
    selector: 'page-list-product',
    templateUrl: 'list-product.html'
})
export class ListProductPage implements OnInit {
    public agrupacionSeleccion: boolean;

    supermarketList: Supermarket[];
    supermarketSubscription: Subscription;

    // supermarketProductSubscription: { [id: string]: Subscription };
    supermarketProductList: { [id: string]: Product[] }

    supermarketProductTop: { [id: string]: number };
    top: number;
    topSubitem: number;
    topDefault: number = 5;

    constructor(private productServiceProvider: ProductServiceProvider, private supermarketService: SupermarketServiceProvider) {
        this.agrupacionSeleccion = false;
    }

    ngOnInit(): void {
        this.supermarketProductList = {};
        this.supermarketProductTop = {};
        this.top = 1;
        this.topSubitem = this.topDefault;
        this.loadSupermarket(null, true);
    }

    doInfinite(infinityScroll) {
        this.loadSupermarket(infinityScroll, false);
    }

    loadSupermarket(infiniteScroll?, loadService?: boolean) {
        if (!this.agrupacionSeleccion) {
            if (loadService) {
                this.supermarketSubscription = this.supermarketService.getSupermarket(this.top).subscribe(supermarkerts => {
                    this.supermarketSubscription.unsubscribe();
                    this.supermarketList = supermarkerts;
                    let lastSupermarket = supermarkerts[supermarkerts.length - 1];
                    this.loadProducts(lastSupermarket, infiniteScroll);
                });
            } else {
                let lastSupermarket = this.supermarketList[this.supermarketList.length - 1];
                this.loadProducts(lastSupermarket, infiniteScroll);
            }
        }
    }

    loadProducts(supermarket: Supermarket, infiniteScroll?) {
        // this.supermarketProductSubscription[supermarket.$key] =
        let key = supermarket.$key;
        let vm = this;
        this.productServiceProvider.getProductsBySupermarket(this.topSubitem, key).subscribe(products => {
            if (!vm.supermarketProductList[key])
                vm.supermarketProductList[key] = [];

            let productsOld = vm.supermarketProductList[key];
            let lengthOld = productsOld.length;
            let productsNews = _.slice(products, vm.topSubitem - vm.topDefault, vm.topSubitem);

            if (productsNews.length > 0)
                vm.supermarketProductList[key] = _.concat(productsOld, productsNews);


            if (lengthOld == products.length) {
                vm.top++;
                vm.topSubitem = vm.topDefault;
                vm.loadSupermarket(infiniteScroll, true);
            }
            else {
                vm.topSubitem = vm.topSubitem + vm.topDefault;
                if (infiniteScroll)
                    infiniteScroll.complete();
            }
        });
    }

    // public GetProductsBySupermarket(supermarket: string): any {
    //     if (!globalProductListSuperMarket[supermarket])
    //         globalProductListSuperMarket[supermarket] = this.productServiceProvider.getProductsBySupermarket(supermarket);
    // }

    // public GetSupermarketByProduct(product: string): void {
    //     if (!globalSupermarkekListProduct[product])
    //         globalSupermarkekListProduct[product] = this.supermarketService.getSupermarketByProduct(product);
    // }

    // public Load(): void {
    //     globalProductListSuperMarket = globalProductListSuperMarket || {};
    //     globalSupermarkekListProduct = globalSupermarkekListProduct || {};

    //     if (!this.agrupacionSeleccion) {
    //         globalSupermarketList = globalSupermarketList || this.supermarketService.getSupermarket();
    //     }
    //     else {
    //         globalProductList = globalProductList || this.productServiceProvider.getProducts();
    //     }
    // }

    // public deleteProduct(item: any): void {
    //     let alert = this.alertCtrl.create({
    //         title: 'Confirmar',
    //         message: '¿Está seguro de quitar el producto de la lista?',
    //         buttons: [
    //             {
    //                 text: 'Cancelar',
    //                 role: 'cancel'
    //             },
    //             {
    //                 text: 'Aceptar',
    //                 handler: () => {
    //                     this.productServiceProvider.deleteProduct(item.$key);
    //                 }
    //             }
    //         ]
    //     });
    //     alert.present();
    // }

    // public changeToggle() {
    //     this.Load();
    // }
}