import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyMarketListPage } from './my-market-list';

@NgModule({
  declarations: [
    MyMarketListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyMarketListPage),
  ],
})
export class MyMarketListPageModule {}
