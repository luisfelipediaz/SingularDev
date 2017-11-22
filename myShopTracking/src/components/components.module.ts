import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductItemComponent } from './product-item/product-item';
import { ProductItemViewComponent } from './product-item-view/product-item-view';
@NgModule({
    declarations: [
        ProductItemComponent,
        ProductItemViewComponent
    ],
    imports: [IonicModule],
    exports: [
        ProductItemComponent,
        ProductItemViewComponent,
        ProductItemViewComponent
    ]
})
export class ComponentsModule { }
