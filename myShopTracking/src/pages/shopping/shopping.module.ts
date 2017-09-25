import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingPage } from './shopping';

import { ProductItemComponent } from '../../components/product-item/product-item';

@NgModule({
  declarations: [
    ShoppingPage,
    ProductItemComponent
  ],
  imports: [
    IonicPageModule.forChild(ShoppingPage),
  ],
})
export class ShoppingPageModule {}
