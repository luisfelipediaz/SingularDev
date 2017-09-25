import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProductPage } from './list-product';

import { ProductItemViewComponent } from '../../components/product-item-view/product-item-view';


@NgModule({
    declarations: [
        ListProductPage,
        ProductItemViewComponent
    ],
    imports: [
        IonicPageModule.forChild(ListProductPage),
    ],
})
export class ListProductPageModule { }
