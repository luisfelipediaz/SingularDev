import { Component, OnInit, Input, Output } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { Supermarket } from '../../interfaces/supermarket';
import { SupermarketServiceProvider } from "../../providers/supermarket-service/supermarket-service";
import { FirebaseListObservable } from "angularfire2/database";

@Component({
    selector: 'page-list-product',
    templateUrl: 'list-product.html'
})
export class ListProductPage implements OnInit {
    private productList: FirebaseListObservable<Product[]>;
    private supermarketList: FirebaseListObservable<Supermarket[]>;
    private productListSuperMarket: { [id: string]: FirebaseListObservable<Product[]> };
    private supermarkekListProduct: { [id: string]: FirebaseListObservable<Supermarket[]> };
    // @Input()
    // @Output()
    public agrupacionSeleccion: boolean;

    constructor(private productServiceProvider: ProductServiceProvider, private supermarketService: SupermarketServiceProvider, private alertCtrl: AlertController) {
        this.agrupacionSeleccion = true;
    }
    ngOnInit(): void {
        this.Load();
    }

    public GetProductsBySupermarket(supermarket: string): any {
        if (!this.productListSuperMarket[supermarket])
            this.productListSuperMarket[supermarket] = this.productServiceProvider.getProductsBySupermarket(supermarket);
    }

    public GetSupermarketByProduct(product: string): void {
        if (!this.supermarkekListProduct[product])
            this.supermarkekListProduct[product] = this.supermarketService.getSupermarketByProduct(product);
        // this.supermarkekListProduct[product].push(observableSupermaket);
    }

    public Load(): void {
        this.productListSuperMarket = this.productListSuperMarket || {};
        this.supermarkekListProduct = this.supermarkekListProduct || {};
        this.productList = null;
        this.supermarketList = null;
        
        if (!this.agrupacionSeleccion)
            this.supermarketList = this.supermarketService.getSupermarket();
        else
            this.productList = this.productServiceProvider.getProducts();
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