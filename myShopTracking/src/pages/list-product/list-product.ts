import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from "../../providers/supermarket-service/supermarket-service";
import { FirebaseListObservable } from "angularfire2/database";

var globalProductList: FirebaseListObservable<Product[]>;
var globalSupermarketList: FirebaseListObservable<Supermarket[]>;
var globalProductListSuperMarket: { [id: string]: FirebaseListObservable<Product[]> };
var globalSupermarkekListProduct: { [id: string]: FirebaseListObservable<Supermarket[]> };

@Component({
    selector: 'page-list-product',
    templateUrl: 'list-product.html'
})
export class ListProductPage implements OnInit {
    public agrupacionSeleccion: boolean;

    get productList(): FirebaseListObservable<Product[]> {
        return globalProductList;
    }

    get supermarketList(): FirebaseListObservable<Supermarket[]> {
        return globalSupermarketList;
    }

    get productListSuperMarket(): { [id: string]: FirebaseListObservable<Product[]> } {
        return globalProductListSuperMarket;
    }

    get supermarkekListProduct(): { [id: string]: FirebaseListObservable<Supermarket[]> } {
        return globalSupermarkekListProduct;
    }

    constructor(private productServiceProvider: ProductServiceProvider, private supermarketService: SupermarketServiceProvider, private alertCtrl: AlertController) {
        this.agrupacionSeleccion = true;
    }

    ngOnInit(): void {
        this.Load();
    }

    public GetProductsBySupermarket(supermarket: string): any {
        if (!globalProductListSuperMarket[supermarket])
            globalProductListSuperMarket[supermarket] = this.productServiceProvider.getProductsBySupermarket(supermarket);
    }

    public GetSupermarketByProduct(product: string): void {
        if (!globalSupermarkekListProduct[product])
            globalSupermarkekListProduct[product] = this.supermarketService.getSupermarketByProduct(product);
    }

    public Load(): void {
        globalProductListSuperMarket = globalProductListSuperMarket || {};
        globalSupermarkekListProduct = globalSupermarkekListProduct || {};

        if (!this.agrupacionSeleccion) {
            globalSupermarketList = globalSupermarketList || this.supermarketService.getSupermarket();
        }
        else {
            globalProductList = globalProductList || this.productServiceProvider.getProducts();
        }
    }

    public deleteProduct(item: any): void {
        let alert = this.alertCtrl.create({
            title: 'Confirmar',
            message: '¿Está seguro de quitar el producto de la lista?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.productServiceProvider.deleteProduct(item.$key);
                    }
                }
            ]
        });
        alert.present();
    }

    public changeToggle() {
        this.Load();
    }
}