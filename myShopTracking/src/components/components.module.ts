import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductItemComponent } from './product-item/product-item';
import { ProductItemViewComponent } from './product-item-view/product-item-view';
import { SupermarketCardComponent } from './supermarket-card/supermarket-card';
@NgModule({
    declarations: [
        ProductItemComponent,
        ProductItemViewComponent,
        SupermarketCardComponent
    ],
    imports: [ IonicModule ],
    exports: [
        ProductItemComponent,
        ProductItemViewComponent,
        ProductItemViewComponent
    ]
})
export class ComponentsModule { }
