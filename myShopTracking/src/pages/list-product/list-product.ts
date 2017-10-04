import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import * as _ from 'lodash';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from "../../providers/supermarket-service/supermarket-service";
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-list-product',
    templateUrl: 'list-product.html'
})
export class ListProductPage implements OnInit {
    public agrupacionSeleccion: boolean;

    supermarketList: Supermarket[];
    supermarketSubscription: Subscription;

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
                this.supermarketSubscription = this.supermarketService.getSupermarkets(this.top).subscribe(supermarkerts => {
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
        let key = supermarket.id;
        this.productServiceProvider.getProductsBySupermarket(this.topSubitem, key).subscribe(products => {
            if (!this.supermarketProductList[key])
                this.supermarketProductList[key] = [];

            let productsOld = this.supermarketProductList[key];
            let lengthOld = productsOld.length;
            let productsNews = _.slice(products, this.topSubitem - this.topDefault, this.topSubitem);

            if (productsNews.length > 0)
                this.supermarketProductList[key] = _.concat(productsOld, productsNews);


            if (lengthOld == products.length) {
                this.top++;
                this.topSubitem = this.topDefault;
                this.loadSupermarket(infiniteScroll, true);
            }
            else {
                this.topSubitem = this.topSubitem + this.topDefault;
                if (infiniteScroll)
                    infiniteScroll.complete();
            }
        });
    }

    public changeToggle() {
        
    }
}