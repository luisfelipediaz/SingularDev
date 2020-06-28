import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupermarketSelectorComponent } from './supermarket-selector/supermarket-selector.component';
import { RegisterProductComponent } from './register-product/register-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    SupermarketSelectorComponent,
    RegisterProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SupermarketSelectorComponent,
    RegisterProductComponent
  ]
})
export class SharedModule { }
