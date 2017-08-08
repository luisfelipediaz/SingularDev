import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroupByPipe } from '../../entities/groupBy.pipe';

import { Product } from '../../interfaces/product';
import { Market } from '../../entities/market';
import { ProductServiceProvider } from "../../providers/product-service/product-service";


@Component({
    selector: 'page-list-product',
    templateUrl: 'list-product.html'
})
export class ListProductPage implements OnInit {
    private productList: Product[];
    constructor(private productServiceProvider: ProductServiceProvider, private alertCtrl: AlertController) {

    }
    ngOnInit(): void {
        this.productServiceProvider.getProducts().then(result => {
            result.forEach(function (productItem) {
                productItem.supermarket = { name: "Alkosto", brand: "", city: "Bogotá" };
            });
            this.productList = result;
        });
    }
    public deleteProduct(item: any): void {
        var vm = this;
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
                        this.productServiceProvider.deleteProduct(item).then(result => {
                            vm.productList = result;
                        });
                    }
                }
            ]
        });
        alert.present();
    }
}