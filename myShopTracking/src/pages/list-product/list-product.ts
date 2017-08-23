import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { Product } from '../../interfaces/product';
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { FirebaseListObservable } from "angularfire2/database";


@Component({
    selector: 'page-list-product',
    templateUrl: 'list-product.html'
})
export class ListProductPage implements OnInit {
    private productList: FirebaseListObservable<Product[]>;
    constructor(private productServiceProvider: ProductServiceProvider, private alertCtrl: AlertController) {

    }
    ngOnInit(): void {
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
}