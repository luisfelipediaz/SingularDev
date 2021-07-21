import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketSelectorComponent } from './supermarket-selector/supermarket-selector.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { ProductInMarketComponent } from './product-in-market/product-in-market.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SupermarketSelectorComponent,
    RegisterProductComponent,
    ProductInMarketComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ProductInMarketComponent
  ],
  entryComponents: [
    SupermarketSelectorComponent,
    RegisterProductComponent
  ]
})
export class SharedModule { }
