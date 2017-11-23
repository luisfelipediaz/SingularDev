import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingPage } from './shopping';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ShoppingPage
  ],
  imports: [
    IonicPageModule.forChild(ShoppingPage),
    ComponentsModule
  ],
})
export class ShoppingPageModule {}
